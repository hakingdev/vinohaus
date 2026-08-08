import Image from "next/image";

import { ourHistory } from "@/lib/landing-content";

export function OurHistory() {
  return (
    <section id="history" className="overflow-hidden bg-parchment">
      <div className="mx-auto grid w-full max-w-[1806px] items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-8 lg:px-[9%] lg:py-28">
        <div>
          <p className="font-body text-sm uppercase tracking-[0.35em] text-gold lg:text-2xl">
            {ourHistory.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase lg:mt-5 lg:text-[80px]">
            {ourHistory.title}
          </h2>
          <div className="mt-6 max-w-[580px] space-y-4 lg:mt-8">
            {ourHistory.paragraphs.map((text) => (
              <p key={text.slice(0, 20)} className="font-body text-[17px] leading-[30px] text-latte">
                {text}
              </p>
            ))}
          </div>
          <a
            href="/shop"
            className="mt-8 inline-block rounded-[6px] bg-gold px-10 py-5 font-body text-lg text-parchment transition-colors hover:bg-honey lg:mt-12 lg:text-[22px]"
          >
            {ourHistory.cta}
          </a>
        </div>

        <div className="relative pb-12 lg:pb-16">
          {/* tilted paper card behind the photo */}
          <div className="absolute -right-4 top-[-6%] h-[110%] w-[105%] rotate-[-3deg] overflow-hidden rounded bg-[#eee3cf] lg:-right-10">
            <Image
              src="/landing/texture-sketch.png"
              alt=""
              fill
              sizes="50vw"
              className="object-cover opacity-10"
            />
          </div>
          <p className="absolute right-2 top-[-2%] z-10 font-body text-5xl italic tracking-[0.1em] text-latte opacity-50 lg:right-4 lg:text-[80px]">
            {ourHistory.year}
          </p>
          <div className="relative mt-8 lg:ml-8 lg:mt-12">
            <Image
              src="/landing/history-photo.jpg"
              alt="Our vineyard"
              width={627}
              height={419}
              className="h-auto w-full rounded-sm object-cover"
            />
            <Image
              src="/landing/stamp.svg"
              alt=""
              width={236}
              height={237}
              className="absolute -bottom-16 -left-8 w-32 opacity-60 lg:-left-16 lg:w-[220px]"
            />
            <p className="mt-3 text-right font-body text-[15px] italic leading-[30px] text-latte lg:text-xl">
              {ourHistory.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
