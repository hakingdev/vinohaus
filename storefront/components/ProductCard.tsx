import Image from "next/image";
import Link from "next/link";

import type { ProductCardData } from "@/lib/saleor/queries";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: ProductCardData }) {
  const price = product.pricing?.priceRange?.start?.gross;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-xl border border-neutral-200 p-4 transition hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
        {product.thumbnail && (
          <Image
            src={product.thumbnail.url}
            alt={product.thumbnail.alt ?? product.name}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-contain"
          />
        )}
      </div>
      <h3 className="mt-3 font-medium">{product.name}</h3>
      {price && (
        <p className="mt-1 text-sm text-neutral-500">
          {formatPrice(price.amount, price.currency)}
        </p>
      )}
    </Link>
  );
}
