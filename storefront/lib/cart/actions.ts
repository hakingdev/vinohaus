"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { CHANNEL, saleorFetch } from "@/lib/saleor/client";
import { CHECKOUT_COOKIE } from "./data";
import {
  CheckoutBillingAddressUpdateMutation,
  CheckoutCreateMutation,
  CheckoutDeliveryMethodUpdateMutation,
  CheckoutEmailUpdateMutation,
  CheckoutLinesAddMutation,
  CheckoutLinesDeleteMutation,
  CheckoutLinesUpdateMutation,
  CheckoutShippingAddressUpdateMutation,
  type CheckoutBillingAddressUpdateResult,
  type CheckoutCreateResult,
  type CheckoutDeliveryMethodUpdateResult,
  type CheckoutEmailUpdateResult,
  type CheckoutLinesAddResult,
  type CheckoutLinesDeleteResult,
  type CheckoutLinesUpdateResult,
  type CheckoutShippingAddressUpdateResult,
  type MutationErrors,
} from "./queries";

export type ActionResult = { ok: boolean; message?: string };

function firstError(payload: MutationErrors | undefined): string | null {
  const err = payload?.errors?.[0];
  if (!err) return null;
  return err.message ?? err.code;
}

export async function addToCart(variantId: string, quantity = 1): Promise<ActionResult> {
  const store = await cookies();
  const existingId = store.get(CHECKOUT_COOKIE)?.value;
  const lines = [{ variantId, quantity }];

  try {
    if (existingId) {
      try {
        const data = await saleorFetch<CheckoutLinesAddResult>({
          query: CheckoutLinesAddMutation,
          variables: { id: existingId, lines },
          revalidate: 0,
        });
        const message = firstError(data.checkoutLinesAdd);
        if (!message) {
          revalidatePath("/cart");
          return { ok: true };
        }
        // Checkout might be stale (completed/expired) — fall through and create a new one.
      } catch {
        // same: stale checkout id, create a fresh one below
      }
    }

    const created = await saleorFetch<CheckoutCreateResult>({
      query: CheckoutCreateMutation,
      variables: { channel: CHANNEL, lines },
      revalidate: 0,
    });
    const message = firstError(created.checkoutCreate);
    if (message || !created.checkoutCreate.checkout) {
      return { ok: false, message: message ?? "Checkout konnte nicht erstellt werden" };
    }

    store.set(CHECKOUT_COOKIE, created.checkoutCreate.checkout.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    revalidatePath("/cart");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unbekannter Fehler",
    };
  }
}

export async function updateLineQuantity(lineId: string, quantity: number): Promise<ActionResult> {
  const id = (await cookies()).get(CHECKOUT_COOKIE)?.value;
  if (!id) return { ok: false, message: "Kein Warenkorb" };

  try {
    if (quantity <= 0) {
      const data = await saleorFetch<CheckoutLinesDeleteResult>({
        query: CheckoutLinesDeleteMutation,
        variables: { id, linesIds: [lineId] },
        revalidate: 0,
      });
      const message = firstError(data.checkoutLinesDelete);
      if (message) return { ok: false, message };
    } else {
      const data = await saleorFetch<CheckoutLinesUpdateResult>({
        query: CheckoutLinesUpdateMutation,
        variables: { id, lines: [{ lineId, quantity }] },
        revalidate: 0,
      });
      const message = firstError(data.checkoutLinesUpdate);
      if (message) return { ok: false, message };
    }
    revalidatePath("/cart");
    revalidatePath("/checkout");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unbekannter Fehler",
    };
  }
}

export async function removeLine(lineId: string): Promise<ActionResult> {
  return updateLineQuantity(lineId, 0);
}

export type ContactFormState = { ok: boolean; message: string };

export async function saveCheckoutContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const id = (await cookies()).get(CHECKOUT_COOKIE)?.value;
  if (!id) return { ok: false, message: "Kein Warenkorb gefunden" };

  const email = String(formData.get("email") ?? "").trim();
  const address = {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    streetAddress1: String(formData.get("streetAddress1") ?? "").trim(),
    postalCode: String(formData.get("postalCode") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    country: "DE",
  };

  try {
    const emailRes = await saleorFetch<CheckoutEmailUpdateResult>({
      query: CheckoutEmailUpdateMutation,
      variables: { id, email },
      revalidate: 0,
    });
    let message = firstError(emailRes.checkoutEmailUpdate);
    if (message) return { ok: false, message };

    const shippingRes = await saleorFetch<CheckoutShippingAddressUpdateResult>({
      query: CheckoutShippingAddressUpdateMutation,
      variables: { id, address },
      revalidate: 0,
    });
    message = firstError(shippingRes.checkoutShippingAddressUpdate);
    if (message) return { ok: false, message };

    const billingRes = await saleorFetch<CheckoutBillingAddressUpdateResult>({
      query: CheckoutBillingAddressUpdateMutation,
      variables: { id, address },
      revalidate: 0,
    });
    message = firstError(billingRes.checkoutBillingAddressUpdate);
    if (message) return { ok: false, message };

    revalidatePath("/checkout");
    return { ok: true, message: "Kontakt & Adresse gespeichert" };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unbekannter Fehler",
    };
  }
}

export async function selectDeliveryMethod(deliveryMethodId: string): Promise<ActionResult> {
  const id = (await cookies()).get(CHECKOUT_COOKIE)?.value;
  if (!id) return { ok: false, message: "Kein Warenkorb" };

  try {
    const data = await saleorFetch<CheckoutDeliveryMethodUpdateResult>({
      query: CheckoutDeliveryMethodUpdateMutation,
      variables: { id, deliveryMethodId },
      revalidate: 0,
    });
    const message = firstError(data.checkoutDeliveryMethodUpdate);
    if (message) return { ok: false, message };
    revalidatePath("/checkout");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unbekannter Fehler",
    };
  }
}
