import type { Metadata } from "next";

import { ProductCard } from "@/components/ProductCard";
import { CHANNEL, saleorFetch } from "@/lib/saleor/client";
import { ProductListQuery, type ProductListResult } from "@/lib/saleor/queries";

export const metadata: Metadata = { title: "Shop" };

async function getProducts() {
  try {
    const data = await saleorFetch<ProductListResult>({
      query: ProductListQuery,
      variables: { channel: CHANNEL, first: 12 },
      tags: ["products"],
      revalidate: 3600,
    });
    return { ok: true as const, products: data.products?.edges.map((e) => e.node) ?? [] };
  } catch (error) {
    return {
      ok: false as const,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export default async function ShopPage() {
  const result = await getProducts();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {!result.ok ? (
        <section className="rounded-xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
          <h1 className="text-lg font-semibold">Saleor ist noch nicht verbunden</h1>
          <p className="mt-2 text-sm">{result.message}</p>
          <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm">
            <li>
              Dev-Instanz anlegen: <code>cloud.saleor.io</code> (kostenlos) oder lokal via
              Docker (<code>saleor-platform</code>)
            </li>
            <li>
              <code>.env.example</code> nach <code>.env.local</code> kopieren und die
              GraphQL-URL eintragen
            </li>
            <li>Dev-Server neu starten</li>
          </ol>
        </section>
      ) : (
        <section>
          <h1 className="font-display text-3xl">Unsere Weine</h1>
          {result.products.length === 0 ? (
            <p className="mt-4 text-latte">
              Keine Produkte im Kanal „{CHANNEL}“ — legen Sie welche im Saleor-Dashboard an.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {result.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
