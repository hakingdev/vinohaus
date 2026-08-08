import Image from "next/image";

import { events } from "@/lib/landing-content";

function Meta({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      <Image src={icon} alt="" width={17} height={18} className="shrink-0" />
      <span className="font-body text-[15px] italic text-latte lg:text-[17px]">{children}</span>
    </span>
  );
}

export function EventsList() {
  return (
    <section id="events" className="bg-parchment">
      <div className="mx-auto w-full max-w-[1806px] px-5 pb-16 pt-14 lg:px-[9%] lg:pb-24 lg:pt-20">
        <div className="text-center">
          <p className="font-body text-sm uppercase tracking-[0.35em] text-gold lg:text-2xl">
            {events.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase lg:mt-5 lg:text-[80px]">
            {events.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-8 lg:space-y-9">
            {events.items.map((event) => (
              <div key={event.title} className="flex rounded-[11px] bg-cream">
                <div className="relative -my-4 ml-0 w-32 shrink-0 overflow-hidden rounded-[11px] sm:w-[202px] lg:-my-6">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="202px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#6c4100]/40 mix-blend-color" />
                </div>
                <div className="px-6 py-7 lg:px-9">
                  <p className="font-body text-lg tracking-[0.1em] lg:text-[26px]">{event.title}</p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                    <Meta icon="/landing/icon-calendar.svg">{event.date}</Meta>
                    <Meta icon="/landing/icon-clock.svg">{event.time}</Meta>
                    <Meta icon="/landing/icon-pin-event.svg">{event.place}</Meta>
                  </div>
                  <a
                    href="#"
                    className="mt-5 inline-block border-y border-cocoa py-1.5 font-body text-[17px] lg:text-xl"
                  >
                    SEE MORE
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="relative aspect-[538/685] overflow-hidden rounded-[11px]">
              <Image
                src="/landing/cellar.png"
                alt="Weinkeller"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#6c4100]/40 mix-blend-color" />
            </div>
            <Image
              src="/landing/stamp.svg"
              alt=""
              width={284}
              height={286}
              className="absolute -right-8 -top-12 w-36 opacity-60 lg:-right-14 lg:-top-16 lg:w-[240px]"
            />
            <p className="mt-3 text-right font-body text-[15px] italic leading-[30px] text-latte lg:text-xl">
              {events.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
