import { clients } from "@/lib/landing-content";

// Logos come from Figma as alpha masks; tint them cocoa via CSS mask,
// exactly how the mockup composes them.
function LogoBadge({ src }: { src: string }) {
  return (
    <div
      aria-hidden
      className="h-24 w-40 bg-cocoa lg:h-[151px] lg:w-[207px]"
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

export function ClientLogos() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto w-full max-w-[1806px] px-5 pb-20 pt-6 lg:px-[9%] lg:pb-32">
        <div className="text-center">
          <p className="font-body text-sm uppercase tracking-[0.35em] text-gold lg:text-2xl">
            {clients.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase lg:mt-5 lg:text-[80px]">
            {clients.title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 border border-sand/80 lg:mt-16 lg:grid-cols-4">
          {clients.logos.map((logo) => (
            <div
              key={logo}
              className="flex aspect-[330/218] items-center justify-center border border-sand/80 p-6"
            >
              <LogoBadge src={logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
