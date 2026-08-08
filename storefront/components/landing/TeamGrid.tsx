import Image from "next/image";

import { team } from "@/lib/landing-content";

const socials = [
  { icon: "/landing/icon-facebook.svg", label: "Facebook" },
  { icon: "/landing/icon-twitter.svg", label: "Twitter" },
  { icon: "/landing/icon-linkedin.svg", label: "LinkedIn" },
];

export function TeamGrid() {
  return (
    <section className="relative overflow-hidden bg-parchment">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 lg:h-[420px]">
        <Image
          src="/landing/texture-sketch.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-5"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1806px] px-5 pb-16 pt-14 lg:px-[9%] lg:pb-28 lg:pt-20">
        <div className="text-center">
          <p className="font-body text-sm uppercase tracking-[0.35em] text-gold lg:text-2xl">
            {team.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase lg:mt-5 lg:text-[80px]">
            {team.title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-7">
          {team.members.map((member) => (
            <div key={member.name}>
              <div className="relative aspect-[309/398] overflow-hidden rounded-[10px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#6c4100]/30 mix-blend-color" />
              </div>
              <p className="mt-5 font-body text-lg tracking-[0.1em] lg:text-2xl">{member.name}</p>
              <p className="mt-1 font-body text-[15px] italic text-gold lg:text-[17px]">
                {member.role}
              </p>
              <div className="mt-3 h-px w-40 bg-sand" />
              <p className="mt-3 max-w-[284px] font-body text-[15px] italic leading-[25px] text-latte lg:text-[17px]">
                {member.text}
              </p>
              <div className="mt-5 flex">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={`${member.name} auf ${social.label}`}
                    className="-ml-px flex size-12 items-center justify-center border-[1.24px] border-bark transition-colors first:ml-0 hover:border-gold"
                  >
                    <Image src={social.icon} alt="" width={20} height={20} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
