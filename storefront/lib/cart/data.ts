import { cookies } from "next/headers";

import { saleorFetch } from "@/lib/saleor/client";
import { CheckoutQuery, type Checkout, type CheckoutQueryResult } from "./queries";

export const CHECKOUT_COOKIE = "vinhaus_checkout";

export async function getCheckout(): Promise<Checkout | null> {
  const id = (await cookies()).get(CHECKOUT_COOKIE)?.value;
  if (!id) return null;
  try {
    const data = await saleorFetch<CheckoutQueryResult>({
      query: CheckoutQuery,
      variables: { id },
      revalidate: 0,
    });
    return data.checkout;
  } catch {
    return null;
  }
}
