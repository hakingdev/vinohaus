import { cookies } from "next/headers";

import { CHECKOUT_COOKIE } from "@/lib/cart/data";
import { saleorFetch } from "@/lib/saleor/client";

export async function GET() {
  const id = (await cookies()).get(CHECKOUT_COOKIE)?.value;
  if (!id) return Response.json({ count: 0 });

  try {
    const data = await saleorFetch<{ checkout: { quantity: number } | null }>({
      query: `query CheckoutCount($id: ID!) { checkout(id: $id) { quantity } }`,
      variables: { id },
      revalidate: 0,
    });
    return Response.json({ count: data.checkout?.quantity ?? 0 });
  } catch {
    return Response.json({ count: 0 });
  }
}
