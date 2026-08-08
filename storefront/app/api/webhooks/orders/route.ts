// Target of the Saleor webhook ORDER_CREATED.
// Later this logic moves to a dedicated Go service (services/fulfillment);
// the storefront route stays as a thin fallback or is removed.
// TODO: verify the saleor-signature (JWS) header before trusting the payload.
export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as {
    order?: { id?: string; number?: string };
  } | null;

  console.log("ORDER_CREATED webhook received:", payload?.order?.number ?? "unknown");

  return Response.json({ ok: true });
}
