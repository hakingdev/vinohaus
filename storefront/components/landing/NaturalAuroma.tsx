import Image from "next/image";

import { naturalAuroma } from "@/lib/landing-content";

const overlayOpacity = ["bg-[#6c4100]/30", "", "bg-[#6c4100]/50", "bg-[#6c4100]/40", "bg-[#6c4100]/40", "bg-[#6c4100]/30"];

export function NaturalAuroma() {
  return (
    <section className="relative overflow-hidden bg-parchment">
      <Image
        src="/landing/gold-dots.png"
        alt=""
        width={828}
        height={762}
        className="pointer-events-none absolute -left-48 top-1/4 w-[420px] opacity-60 lg:w-[640px]"
      />
      <Image
        src="/landing/stamp.svg"
        alt=""
        width={237}
        height={239}
        className="pointer-events-none absolute -right-16 top-[55%] w-40 rotate-[28deg] opacity-50 lg:w-[237px]"
      />

      <div className="relative mx-auto w-full max-w-[1806px] px-5 pb-16 pt-14 lg:px-[9%] lg:pb-28 lg:pt-20">
        <div className="text-center">
          <p className="font-body text-sm uppercase tracking-[0.35em] text-gold lg:text-2xl">
            {naturalAuroma.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase lg:mt-5 lg:text-[80px]">
            {naturalAuroma.title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {naturalAuroma.photos.map((photo, i) => (
            <div key={photo} className="relative aspect-[410/285] overflow-hidden rounded-[10px]">
              <Image
                src={photo}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="object-cover"
              />
              {overlayOpacity[i] && (
                <div className={`absolute inset-0 mix-blend-color ${overlayOpacity[i]}`} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {naturalAuroma.features.map((feature) => (
              <div key={feature.label} className="flex items-start gap-4">
                <Image src={feature.icon} alt="" width={44} height={44} className="mt-1 shrink-0" />
                <div>
                  <p className="font-body text-lg tracking-[0.1em] lg:text-2xl">{feature.label}</p>
                  <p className="mt-1 font-body text-[15px] italic text-latte lg:text-[17px]">
                    {feature.sub}
                  </p>
                  <div className="mt-3 h-px w-40 bg-sand" />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-display text-3xl uppercase lg:text-[60px]">
              {naturalAuroma.history.title}
            </h3>
            <p className="mt-5 max-w-[494px] font-body text-[17px] leading-[30px] text-latte">
              {naturalAuroma.history.text}
            </p>
            <a
              href="/shop"
              className="mt-8 inline-block rounded-[6px] bg-gold px-10 py-5 font-body text-lg text-parchment transition-colors hover:bg-honey lg:text-[22px]"
            >
              {naturalAuroma.history.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
