import { features } from "@/lib/landing-content";

export function FeatureStrip() {
  return (
    <section className="border-b-2 border-sand bg-parchment">
      <div className="mx-auto grid w-full max-w-[1806px] gap-8 px-5 py-10 sm:grid-cols-3 lg:gap-4 lg:px-[9%] lg:py-14">
        {features.map((item) => (
          <div key={item.label} className="flex items-start gap-5">
            <span className="font-display text-5xl leading-none text-gold lg:text-[90px]">
              {item.number}
            </span>
            <div className="pt-1 lg:pt-4">
              <p className="font-body text-lg tracking-[0.1em] lg:text-2xl">{item.label}</p>
              <p className="mt-1 font-body text-[15px] italic text-latte lg:text-[17px]">
                {item.sub}
              </p>
              <div className="mt-3 h-px w-40 bg-sand" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
