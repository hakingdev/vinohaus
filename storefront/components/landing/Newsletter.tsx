"use client";

import Image from "next/image";
import { useState } from "react";

import { newsletter } from "@/lib/landing-content";

export function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-parchment">
      <div className="mx-auto w-full max-w-[1806px] px-5 pb-16 lg:px-[3.85%] lg:pb-28">
        <div className="relative h-64 overflow-hidden rounded-[10px] sm:h-80 lg:h-[637px]">
          <Image
            src="/landing/newsletter-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#6c4100]/30 mix-blend-color" />
        </div>

        <div className="relative mx-auto -mt-24 w-[94%] max-w-[1316px] overflow-hidden rounded-[10px] bg-cream px-6 py-10 lg:-mt-[280px] lg:px-16 lg:py-16">
          <Image
            src="/landing/stamp.svg"
            alt=""
            width={284}
            height={286}
            className="pointer-events-none absolute left-4 top-4 w-32 opacity-50 lg:left-16 lg:top-8 lg:w-[210px]"
          />

          <div className="relative text-center">
            <h2 className="font-display text-3xl uppercase lg:text-[60px]">{newsletter.title}</h2>
            <p className="mt-2 font-body text-[15px] italic text-gold lg:text-[17px]">
              {newsletter.sub}
            </p>
            <p className="mx-auto mt-4 max-w-[790px] font-body text-[15px] leading-[30px] text-latte lg:text-[17px]">
              {newsletter.text}
            </p>

            {sent ? (
              <p className="mt-10 font-body text-lg text-gold">
                Vielen Dank! Bitte bestätigen Sie Ihre E-Mail-Adresse.
              </p>
            ) : (
              // TODO: an einen echten Newsletter-Dienst anbinden (z. B. Listmonk/Brevo)
              <form
                className="mx-auto mt-8 max-w-[642px] lg:mt-12"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <input
                  type="email"
                  required
                  placeholder={newsletter.placeholder}
                  className="w-full border-b border-cocoa/60 bg-transparent pb-3 text-center font-body text-[17px] italic outline-none placeholder:text-cocoa/30 focus:border-gold"
                />
                <button
                  type="submit"
                  className="mt-8 rounded-[6px] bg-gold px-14 py-4 font-body text-lg text-parchment transition-colors hover:bg-honey lg:px-16 lg:py-5 lg:text-[22px]"
                >
                  {newsletter.cta}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
