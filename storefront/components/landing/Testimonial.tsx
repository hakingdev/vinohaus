import Image from "next/image";

import { testimonial } from "@/lib/landing-content";

export function Testimonial() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 lg:h-80">
        <Image
          src="/landing/texture-sketch.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-10"
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1806px] items-end gap-10 px-5 pt-14 lg:grid-cols-[1.2fr_1fr] lg:gap-4 lg:px-[9%] lg:pt-0">
        <div className="pb-6 lg:py-24">
          <Image src="/landing/quote-mark.svg" alt="" width={88} height={62} className="w-14 lg:w-[88px]" />
          <blockquote className="mt-5 max-w-[726px] font-body text-xl leading-relaxed lg:text-[30px] lg:leading-[45px]">
            {testimonial.quote}
          </blockquote>
          <p className="mt-8 font-body text-xl tracking-[0.1em] text-honey lg:mt-14 lg:text-[34px]">
            {testimonial.name}
          </p>
          <p className="mt-2 font-body text-lg italic lg:text-2xl">{testimonial.role}</p>
        </div>

        <div className="relative mx-auto flex w-64 items-end justify-center sm:w-80 lg:w-full lg:max-w-[631px]">
          <Image
            src="/landing/testimonial-circle.svg"
            alt=""
            width={526}
            height={524}
            className="absolute bottom-[10%] left-1/2 w-[85%] -translate-x-1/2"
          />
          <Image
            src="/landing/testimonial-flowers.png"
            alt=""
            width={282}
            height={434}
            className="absolute -left-6 bottom-[20%] w-[45%] lg:-left-10"
          />
          <Image
            src="/landing/testimonial-flowers.png"
            alt=""
            width={282}
            height={434}
            className="absolute -right-6 bottom-[25%] w-[48%] rotate-[177deg] lg:-right-10"
          />
          <Image
            src="/landing/testimonial-portrait.png"
            alt={testimonial.name}
            width={924}
            height={1024}
            className="relative h-auto w-[85%]"
          />
        </div>
      </div>
    </section>
  );
}
