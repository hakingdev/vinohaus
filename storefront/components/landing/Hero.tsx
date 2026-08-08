import Image from "next/image";

import { hero } from "@/lib/landing-content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 lg:h-[500px]">
        <Image
          src="/landing/texture-sketch.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-10"
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1806px] items-center gap-10 px-5 pb-16 pt-8 lg:grid-cols-[1.1fr_1fr] lg:gap-0 lg:px-[6%] lg:pb-28 lg:pt-16">
        <div className="order-2 max-w-[852px] lg:order-1">
          <p className="font-body text-sm tracking-[0.35em] text-gold lg:text-2xl">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-[42px] leading-[1.15] lg:mt-6 lg:text-[91px] lg:leading-[1.1]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[587px] font-body text-[17px] leading-8 lg:mt-10 lg:text-xl lg:leading-10">
            {hero.text}
          </p>
          <a
            href="#history"
            className="mt-8 inline-block border-y-[1.18px] border-gold px-14 py-5 text-center font-body text-lg tracking-[0.05em] transition-colors hover:text-gold lg:mt-12 lg:px-20 lg:text-[22px]"
          >
            {hero.cta}
          </a>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[722/821] w-64 sm:w-80 lg:w-full lg:max-w-[722px]">
            <Image
              src="/landing/hero-ellipse.svg"
              alt=""
              width={484}
              height={483}
              className="absolute left-1/2 top-[45%] w-[62%] -translate-x-[38%] -translate-y-1/2"
            />
            <Image
              src="/landing/hero-bottle.png"
              alt="Pinot Noir — Vin Rouge"
              fill
              sizes="(min-width: 1024px) 40vw, 320px"
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
