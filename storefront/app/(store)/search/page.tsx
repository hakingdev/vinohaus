import { ProductCard } from "@/components/ProductCard";
import { CHANNEL, saleorFetch } from "@/lib/saleor/client";
import {
  SearchProductsQuery,
  type SearchProductsResult,
} from "@/lib/saleor/queries";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  let products: SearchProductsResult["products"] = null;
  if (q) {
    const data = await saleorFetch<SearchProductsResult>({
      query: SearchProductsQuery,
      variables: { channel: CHANNEL, query: q, first: 24 },
      revalidate: 60,
    });
    products = data.products;
  }

  const results = products?.edges.map((e) => e.node) ?? [];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Suche</h1>

      <form action="/search" className="mt-4 flex max-w-md gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Riesling, Spätburgunder …"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm"
        />
        <button className="rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white">
          Suchen
        </button>
      </form>

      {q &&
        (results.length === 0 ? (
          <p className="mt-6 text-neutral-500">Keine Treffer für „{q}“.</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}
    </section>
  );
}
