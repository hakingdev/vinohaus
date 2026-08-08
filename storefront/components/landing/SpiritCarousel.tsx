"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export type SpiritItem = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string | null;
  href: string;
};

export function SpiritCarousel({ items }: { items: SpiritItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 540;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 pt-20 [scrollbar-width:none] lg:px-[6%]"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="relative w-[85vw] max-w-[506px] shrink-0 snap-start sm:w-[506px]"
          >
            <div className="mt-0 rounded-[11px] bg-cream pb-8 pl-[38%] pr-6 pt-7 lg:h-[255px]">
              <p className="font-body text-lg uppercase leading-snug lg:text-2xl">{item.name}</p>
              <p className="mt-2 font-body text-[15px] italic text-gold lg:text-[17px]">
                {item.subtitle}
              </p>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-body text-[15px] italic text-latte lg:text-[17px]">IN STOCK</p>
                  <p className="mt-1 font-body text-2xl lg:text-[33px]">{item.price}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label="Merken"
                    className="flex size-12 items-center justify-center border-[1.5px] border-latte transition-colors hover:border-gold lg:size-14"
                  >
                    <Image src="/landing/icon-heart.svg" alt="" width={25} height={22} />
                  </button>
                  <Link
                    href={item.href}
                    aria-label="Zum Produkt"
                    className="flex size-12 items-center justify-center border-[1.5px] border-latte transition-colors hover:border-gold lg:size-14"
                  >
                    <Image src="/landing/icon-cart-small.svg" alt="" width={31} height={30} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute -top-16 bottom-2 left-6 w-[28%] lg:-top-20 lg:left-8">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="160px"
                  className="object-contain object-bottom drop-shadow-lg"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Zurück"
          onClick={() => scrollByCard(-1)}
          className="flex size-11 items-center justify-center rounded-full border border-bark font-body text-xl text-bark transition-colors hover:border-gold hover:text-gold"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Weiter"
          onClick={() => scrollByCard(1)}
          className="flex size-11 items-center justify-center rounded-full border border-bark font-body text-xl text-bark transition-colors hover:border-gold hover:text-gold"
        >
          ›
        </button>
      </div>
    </div>
  );
}
