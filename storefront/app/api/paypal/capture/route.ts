import { cookies } from "next/headers";

import { CHECKOUT_COOKIE, getCheckout } from "@/lib/cart/data";
import { capturePayPalOrder, getPayPalOrder } from "@/lib/paypal";
import { saleorFetch } from "@/lib/saleor/client";

type CheckoutCompleteResult = {
  checkoutComplete: {
    order: { id: string; number: string } | null;
    errors: { field: string | null; message: string | null; code: string }[];
  };
};

type TransactionCreateResult = {
  transactionCreate: {
    errors: { field: string | null; message: string | null; code: string }[];
  };
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { orderId?: string } | null;
  const paypalOrderId = body?.orderId;
  if (!paypalOrderId) {
    return Response.json({ error: "orderId fehlt" }, { status: 400 });
  }

  const checkout = await getCheckout();
  if (!checkout || checkout.lines.length === 0) {
    return Response.json({ error: "Warenkorb ist leer" }, { status: 400 });
  }

  // 1. Verify the PayPal order belongs to this checkout and matches its total.
  let paypalOrder;
  try {
    paypalOrder = await getPayPalOrder(paypalOrderId);
  } catch (error) {
    console.error("paypal get order failed:", error);
    return Response.json({ error: "PayPal-Bestellung nicht gefunden" }, { status: 502 });
  }

  const unit = paypalOrder.purchase_units[0];
  const total = checkout.totalPrice.gross;
  if (
    unit?.custom_id !== checkout.id ||
    unit?.amount.currency_code !== total.currency ||
    Math.abs(Number(unit?.amount.value) - total.amount) > 0.005
  ) {
    return Response.json({ error: "Zahlungsbetrag stimmt nicht überein" }, { status: 409 });
  }

  // 2. Turn the checkout into an order (channel allows unpaid orders).
  const completed = await saleorFetch<CheckoutCompleteResult>({
    query: `mutation CheckoutComplete($id: ID!) {
      checkoutComplete(id: $id) {
        order { id number }
        errors { field message code }
      }
    }`,
    variables: { id: checkout.id },
    revalidate: 0,
  });
  const completeError = completed.checkoutComplete.errors[0];
  const order = completed.checkoutComplete.order;
  if (completeError || !order) {
    return Response.json(
      { error: completeError?.message ?? "Bestellung konnte nicht erstellt werden" },
      { status: 400 }
    );
  }

  // 3. Capture the money. If this fails the order stays unpaid — no money moved.
  let captureId = paypalOrderId;
  try {
    const captured = await capturePayPalOrder(paypalOrderId);
    captureId =
      captured.purchase_units[0]?.payments?.captures?.[0]?.id ?? paypalOrderId;
  } catch (error) {
    console.error(`paypal capture failed for order ${order.number}:`, error);
    return Response.json(
      { error: "Zahlung fehlgeschlagen — die Bestellung wurde nicht abgebucht" },
      { status: 502 }
    );
  }

  // 4. Record the payment on the order (needs HANDLE_PAYMENTS on the app token).
  const appToken = process.env.SALEOR_APP_TOKEN;
  if (appToken) {
    try {
      const recorded = await saleorFetch<TransactionCreateResult>({
        query: `mutation TransactionCreate($id: ID!, $transaction: TransactionCreateInput!) {
          transactionCreate(id: $id, transaction: $transaction) {
            errors { field message code }
          }
        }`,
        variables: {
          id: order.id,
          transaction: {
            name: "PayPal",
            pspReference: captureId,
            availableActions: [],
            amountCharged: { amount: total.amount, currency: total.currency },
          },
        },
        revalidate: 0,
        token: appToken,
      });
      const txError = recorded.transactionCreate.errors[0];
      if (txError) {
        console.error(`transactionCreate failed for order ${order.number}:`, txError);
      }
    } catch (error) {
      // Payment is captured; only the bookkeeping in Saleor failed. Don't block the buyer.
      console.error(`transactionCreate threw for order ${order.number}:`, error);
    }
  }

  (await cookies()).set(CHECKOUT_COOKIE, "", { maxAge: 0, path: "/" });
  return Response.json({ orderNumber: order.number });
}
