import Image from "next/image";

import { categoryCards } from "@/lib/landing-content";

export function CategoryCards() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto grid w-full max-w-[1806px] gap-5 px-5 pb-6 pt-10 sm:grid-cols-2 lg:px-[3.85%] xl:grid-cols-4">
        {categoryCards.map((card, i) => (
          <div
            key={card.title}
            className="relative aspect-[410/272] overflow-visible rounded-[10px] bg-cream"
          >
            <div className="relative z-10 pl-6 pt-[30%] lg:pl-7 lg:pt-[34%]">
              <p className="font-body text-[15px] tracking-[0.15em] text-gold lg:text-[17px]">
                {card.eyebrow}
              </p>
              <p className="mt-1 font-body text-lg tracking-[0.1em] lg:text-2xl">{card.title}</p>
              <p className="mt-2 font-body text-[15px] italic text-latte lg:text-[17px]">
                {card.sub}
              </p>
            </div>
            {i < 3 ? (
              // full-card overlays exported from Figma (objects pre-positioned, masks applied)
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="pointer-events-none object-cover"
              />
            ) : (
              <Image
                src={card.image}
                alt=""
                width={127}
                height={226}
                className="pointer-events-none absolute -top-[12%] right-6 h-[110%] w-auto"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
