import Image from "next/image";

export function PhotoBand({
  image,
  alt,
  title,
  sub,
  imagePosition = "object-center",
}: {
  image: string;
  alt: string;
  title: string;
  sub: string;
  imagePosition?: string;
}) {
  return (
    <section className="bg-parchment">
      <div className="mx-auto w-full max-w-[1806px] px-5 pb-16 pt-4 lg:px-[3.85%] lg:pb-24">
        <div className="relative h-72 overflow-hidden rounded-[10px] sm:h-96 lg:h-[630px]">
          <Image src={image} alt={alt} fill sizes="100vw" className={`object-cover ${imagePosition}`} />
          <div className="absolute inset-0 bg-[#6c4100]/30 mix-blend-color" />
          <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-10">
            <p className="font-body text-lg tracking-[0.1em] text-white lg:text-2xl">{title}</p>
            <p className="mt-1 font-body text-[15px] italic text-[#c97801] lg:text-[17px]">{sub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
