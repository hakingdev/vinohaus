import Image from "next/image";
import { notFound } from "next/navigation";

import { AddToCart } from "@/components/cart/AddToCart";
import { CHANNEL, saleorFetch } from "@/lib/saleor/client";
import { ProductDetailsQuery, type ProductDetailsResult } from "@/lib/saleor/queries";
import { formatPrice } from "@/lib/utils";

// Saleor stores descriptions as EditorJS JSON; render the text blocks.
function parseDescription(raw: string): string[] | null {
  try {
    const doc = JSON.parse(raw) as {
      blocks?: { type: string; data?: { text?: string } }[];
    };
    return doc.blocks?.flatMap((b) => (b.data?.text ? [b.data.text] : [])) ?? null;
  } catch {
    return null;
  }
}

function DescriptionBlocks({ raw }: { raw: string | null }) {
  if (!raw) return null;
  const blocks = parseDescription(raw);
  if (!blocks) {
    return <p className="mt-6 text-sm text-neutral-700">{raw}</p>;
  }
  return (
    <div className="prose mt-6 max-w-none text-sm text-neutral-700">
      {blocks.map((text, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: text }} />
      ))}
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await saleorFetch<ProductDetailsResult>({
    query: ProductDetailsQuery,
    variables: { slug, channel: CHANNEL },
    tags: ["products", `product-${slug}`],
    revalidate: 3600,
  });

  const product = data.product;
  if (!product) notFound();

  const price = product.pricing?.priceRange?.start?.gross;
  const image = product.media[0];

  return (
    <article className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 md:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
        {image && (
          <Image
            src={image.url}
            alt={image.alt ?? product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain"
            priority
          />
        )}
      </div>

      <div>
        {product.category && (
          <p className="text-sm text-neutral-500">{product.category.name}</p>
        )}
        <h1 className="mt-1 text-2xl font-semibold">{product.name}</h1>
        {price && (
          <p className="mt-3 text-xl">{formatPrice(price.amount, price.currency)}</p>
        )}
        {/* TODO: Grundpreis (€/l) anzeigen, sobald das Flaschenvolumen als Attribut gepflegt ist */}

        <AddToCart
          variants={(product.variants ?? []).map((variant) => ({
            id: variant.id,
            name: variant.name,
            price: variant.pricing?.price
              ? formatPrice(
                  variant.pricing.price.gross.amount,
                  variant.pricing.price.gross.currency
                )
              : null,
          }))}
        />

        <DescriptionBlocks raw={product.description} />
      </div>
    </article>
  );
}
