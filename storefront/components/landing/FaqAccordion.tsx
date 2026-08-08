import Image from "next/image";

import { faq } from "@/lib/landing-content";

export function FaqAccordion() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto w-full max-w-[1806px] px-5 pb-16 lg:px-[3.85%] lg:pb-24">
        <div className="grid gap-10 rounded-[10px] bg-cream px-6 py-10 lg:grid-cols-2 lg:gap-8 lg:px-[8%] lg:py-24">
          <div>
            <h2 className="font-body text-2xl tracking-[0.1em] lg:text-[32px]">{faq.heading}</h2>
            <p className="mt-2 font-body text-lg italic text-gold lg:text-2xl">{faq.sub}</p>

            <div className="mt-8 max-w-[649px]">
              {faq.items.map((item, i) => (
                <details
                  key={item.question}
                  name="faq"
                  open={i === 0}
                  className="group border-[1.24px] border-bark/80 [&:not(:first-child)]:border-t-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-body text-lg lg:text-2xl">{item.question}</span>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-latte font-body text-latte">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <p className="px-6 pb-6 font-body text-[17px] leading-[30px] text-latte">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/landing/map.svg"
              alt="Illustrierte Karte unserer Weinberge"
              width={662}
              height={566}
              className="h-auto w-full max-w-[662px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
