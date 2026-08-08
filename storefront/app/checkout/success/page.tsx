import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Bestellung bestätigt" };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-20 text-center">
      <Image
        src="/landing/stamp.svg"
        alt=""
        width={237}
        height={239}
        className="mx-auto w-32 opacity-70"
      />
      <h1 className="mt-8 font-display text-3xl lg:text-4xl">Vielen Dank!</h1>
      <p className="mt-4 font-body text-lg text-latte">
        Ihre Bestellung {order ? <strong className="text-cocoa">#{order}</strong> : null} ist
        eingegangen und wird vorbereitet.
      </p>
      <p className="mt-2 font-body text-[15px] italic text-latte">
        Eine Bestätigung senden wir per E-Mail. Bitte halten Sie bei der Lieferung Ihren
        Ausweis bereit (Alterssichtprüfung 18+).
      </p>
      <Link
        href="/shop"
        className="mt-10 inline-block rounded-[6px] bg-gold px-10 py-4 font-body text-lg text-parchment transition-colors hover:bg-honey"
      >
        Weiter stöbern
      </Link>
    </main>
  );
}
