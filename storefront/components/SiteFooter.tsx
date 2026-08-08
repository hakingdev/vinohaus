import Image from "next/image";

import { footerAbout, footerContact, footerNews } from "@/lib/landing-content";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-fit">
      <h3 className="font-body text-xl tracking-[0.1em] lg:text-2xl">{children}</h3>
      <div className="mt-3 h-px w-full min-w-40 bg-gold/70" />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer id="news" className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 lg:h-[420px]">
        <Image
          src="/landing/texture-sketch.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-[0.07]"
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1806px] gap-12 px-5 pb-24 pt-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8 lg:px-[6%] lg:pt-24 lg:pb-40">
        <Image
          src="/landing/logo.svg"
          alt="Vin Rouge"
          width={515}
          height={131}
          className="h-14 w-auto self-start lg:h-[100px]"
        />

        <div>
          <ColumnHeading>{footerContact.heading}</ColumnHeading>
          <ul className="mt-5 space-y-3">
            {footerContact.items.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <Image src={item.icon} alt="" width={18} height={18} className="shrink-0" />
                <span className="font-body text-[17px] italic text-latte">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnHeading>{footerAbout.heading}</ColumnHeading>
          <ul className="mt-5 space-y-3">
            {footerAbout.items.map((item) => (
              <li key={item} className="font-body text-[17px] italic text-latte">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnHeading>{footerNews.heading}</ColumnHeading>
          <ul className="mt-5 space-y-5">
            {footerNews.items.map((item) => (
              <li key={item.title}>
                <p className="font-body text-[15px] italic text-honey">{item.date}</p>
                <p className="mt-1 font-body text-lg tracking-[0.1em] text-latte">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="relative pb-10 text-center font-body text-[15px] lg:pb-16 lg:text-[17px]">
        Copyright <span className="text-gold">Dotcreativemarket</span>
      </p>
    </footer>
  );
}
