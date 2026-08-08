import Image from "next/image";

import { SpiritCarousel, type SpiritItem } from "@/components/landing/SpiritCarousel";
import { bestSpirits } from "@/lib/landing-content";
import { CHANNEL, saleorFetch } from "@/lib/saleor/client";
import { ProductListQuery, type ProductListResult } from "@/lib/saleor/queries";
import { formatPrice } from "@/lib/utils";

async function getItems(): Promise<SpiritItem[]> {
  try {
    const data = await saleorFetch<ProductListResult>({
      query: ProductListQuery,
      variables: { channel: CHANNEL, first: 8 },
      tags: ["products"],
      revalidate: 3600,
    });
    const products = data.products?.edges.map((e) => e.node) ?? [];
    if (products.length === 0) return bestSpirits.fallback;
    return products.map((p) => {
      const gross = p.pricing?.priceRange?.start?.gross;
      return {
        id: p.id,
        name: p.name,
        subtitle: "Vin Rouge Selection",
        price: gross ? formatPrice(gross.amount, gross.currency) : "—",
        image: p.thumbnail?.url ?? null,
        href: `/products/${p.slug}`,
      };
    });
  } catch {
    return bestSpirits.fallback;
  }
}

export async function BestSpirits() {
  const items = await getItems();

  return (
    <section className="relative overflow-hidden bg-parchment">
      <Image
        src="/landing/gold-dots.png"
        alt=""
        width={828}
        height={762}
        className="pointer-events-none absolute -left-40 top-1/3 w-[420px] opacity-70 lg:w-[700px]"
      />
      <div className="relative pb-16 pt-14 lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="font-body text-sm uppercase tracking-[0.35em] text-gold lg:text-2xl">
            {bestSpirits.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase lg:mt-5 lg:text-[80px]">
            {bestSpirits.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[564px] font-body text-[17px] leading-[30px] text-latte">
            {bestSpirits.text}
          </p>
        </div>
        <SpiritCarousel items={items} />
      </div>
    </section>
  );
}
