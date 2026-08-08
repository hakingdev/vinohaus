import { getCheckout } from "@/lib/cart/data";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST() {
  const checkout = await getCheckout();
  if (!checkout || checkout.lines.length === 0) {
    return Response.json({ error: "Warenkorb ist leer" }, { status: 400 });
  }
  if (!checkout.email || !checkout.shippingAddress || !checkout.deliveryMethod) {
    return Response.json(
      { error: "Bitte zuerst Adresse und Versandart wählen" },
      { status: 400 }
    );
  }

  try {
    const total = checkout.totalPrice.gross;
    const order = await createPayPalOrder(total.amount, total.currency, checkout.id);
    return Response.json({ id: order.id });
  } catch (error) {
    console.error("paypal create-order failed:", error);
    return Response.json({ error: "PayPal nicht erreichbar" }, { status: 502 });
  }
}
