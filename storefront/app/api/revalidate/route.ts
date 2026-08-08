import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

// Target of the Saleor webhook PRODUCT_UPDATED / PRODUCT_CREATED / PRODUCT_DELETED.
// Configure in Saleor Dashboard: Apps & Webhooks → your app → add webhook
// pointing to https://<storefront>/api/revalidate?secret=<SALEOR_WEBHOOK_SECRET>.
// TODO: replace the shared-secret check with proper saleor-signature (JWS) verification.
export async function POST(request: NextRequest) {
  const secret =
    request.headers.get("x-webhook-secret") ??
    request.nextUrl.searchParams.get("secret");

  if (!process.env.SALEOR_WEBHOOK_SECRET || secret !== process.env.SALEOR_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidateTag("products", "max");
  return NextResponse.json({ ok: true, revalidated: "products" });
}
