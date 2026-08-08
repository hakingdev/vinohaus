import { notFound } from "next/navigation";

import { ProductCard } from "@/components/ProductCard";
import { CHANNEL, saleorFetch } from "@/lib/saleor/client";
import {
  CategoryProductsQuery,
  type CategoryProductsResult,
} from "@/lib/saleor/queries";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await saleorFetch<CategoryProductsResult>({
    query: CategoryProductsQuery,
    variables: { slug, channel: CHANNEL, first: 24 },
    tags: ["products", `category-${slug}`],
    revalidate: 3600,
  });

  const category = data.category;
  if (!category) notFound();

  const products = category.products?.edges.map((e) => e.node) ?? [];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">{category.name}</h1>
      {products.length === 0 ? (
        <p className="mt-4 text-neutral-500">Keine Produkte in dieser Kategorie.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
