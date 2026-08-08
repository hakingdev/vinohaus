import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CartLineControls } from "@/components/cart/CartLineControls";
import { getCheckout } from "@/lib/cart/data";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Warenkorb" };

export default async function CartPage() {
  const checkout = await getCheckout();
  const lines = checkout?.lines ?? [];

  if (lines.length === 0) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl">Warenkorb</h1>
        <p className="mt-4 font-body italic text-latte">Ihr Warenkorb ist noch leer.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-[6px] bg-gold px-10 py-4 font-body text-lg text-parchment transition-colors hover:bg-honey"
        >
          Weine entdecken
        </Link>
      </section>
    );
  }

  const subtotal = checkout!.subtotalPrice.gross;
  const total = checkout!.totalPrice.gross;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl lg:text-4xl">Warenkorb</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <ul className="divide-y divide-sand/60">
          {lines.map((line) => {
            const product = line.variant.product;
            return (
              <li key={line.id} className="flex gap-5 py-5">
                <Link
                  href={`/products/${product.slug}`}
                  className="relative block h-28 w-20 shrink-0 rounded bg-cream"
                >
                  {product.thumbnail && (
                    <Image
                      src={product.thumbnail.url}
                      alt={product.thumbnail.alt ?? product.name}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  )}
                </Link>
                <div className="flex flex-1 flex-wrap items-center justify-between gap-4">
                  <div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-body text-lg hover:text-gold"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 font-body text-sm italic text-latte">{line.variant.name}</p>
                    <div className="mt-3">
                      <CartLineControls lineId={line.id} quantity={line.quantity} />
                    </div>
                  </div>
                  <p className="font-body text-lg">
                    {formatPrice(line.totalPrice.gross.amount, line.totalPrice.gross.currency)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit rounded-[10px] bg-cream p-6 lg:p-8">
          <h2 className="font-body text-xl tracking-[0.1em]">ÜBERSICHT</h2>
          <dl className="mt-5 space-y-3 font-body text-[15px]">
            <div className="flex justify-between">
              <dt className="text-latte">Zwischensumme</dt>
              <dd>{formatPrice(subtotal.amount, subtotal.currency)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-latte">Versand</dt>
              <dd className="italic text-latte">wird an der Kasse berechnet</dd>
            </div>
            <div className="flex justify-between border-t border-sand/60 pt-3 text-lg">
              <dt>Gesamt</dt>
              <dd>{formatPrice(total.amount, total.currency)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 block rounded-[6px] bg-gold px-6 py-4 text-center font-body text-lg text-parchment transition-colors hover:bg-honey"
          >
            Zur Kasse
          </Link>
          <p className="mt-3 text-center font-body text-xs italic text-latte">
            inkl. MwSt. · Verkauf nur an Personen über 18 Jahre
          </p>
        </aside>
      </div>
    </section>
  );
}
