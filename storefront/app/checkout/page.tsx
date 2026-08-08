import type { Metadata } from "next";
import Link from "next/link";

import { AddressForm } from "@/components/cart/AddressForm";
import { DeliveryMethodPicker } from "@/components/cart/DeliveryMethodPicker";
import { PayPalPayment } from "@/components/cart/PayPalPayment";
import { getCheckout } from "@/lib/cart/data";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Kasse" };

function StepHeading({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 font-body text-xl tracking-[0.05em]">
      <span className="flex size-8 items-center justify-center rounded-full bg-gold font-body text-[15px] text-parchment">
        {n}
      </span>
      {children}
    </h2>
  );
}

export default async function CheckoutPage() {
  const checkout = await getCheckout();

  if (!checkout || checkout.lines.length === 0) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl">Kasse</h1>
        <p className="mt-4 font-body italic text-latte">Ihr Warenkorb ist leer.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-[6px] bg-gold px-10 py-4 font-body text-lg text-parchment transition-colors hover:bg-honey"
        >
          Weine entdecken
        </Link>
      </main>
    );
  }

  const contactDone = Boolean(checkout.email && checkout.shippingAddress);
  const total = checkout.totalPrice.gross;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl lg:text-4xl">Kasse</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div className="space-y-10">
          <section>
            <StepHeading n={1}>Kontakt & Lieferadresse</StepHeading>
            <div className="mt-5">
              <AddressForm email={checkout.email} address={checkout.shippingAddress} />
            </div>
          </section>

          <section>
            <StepHeading n={2}>Versandart</StepHeading>
            <div className="mt-5">
              {!contactDone ? (
                <p className="font-body text-[15px] italic text-latte">
                  Bitte zuerst die Lieferadresse speichern.
                </p>
              ) : checkout.shippingMethods.length === 0 ? (
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 font-body text-sm text-amber-900">
                  Für Ihre Adresse sind noch keine Versandarten konfiguriert — die
                  Versandzonen werden derzeit eingerichtet.
                </div>
              ) : (
                <DeliveryMethodPicker
                  methods={checkout.shippingMethods}
                  selectedId={checkout.deliveryMethod?.id ?? null}
                />
              )}
            </div>
          </section>

          <section>
            <StepHeading n={3}>Zahlung</StepHeading>
            <div className="mt-5">
              {!checkout.deliveryMethod ? (
                <p className="font-body text-[15px] italic text-latte">
                  Bitte zuerst eine Versandart wählen.
                </p>
              ) : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ? (
                <PayPalPayment
                  clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}
                  currency={total.currency}
                />
              ) : (
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 font-body text-sm text-amber-900">
                  PayPal wird gerade konfiguriert — die Bezahlung ist in Kürze verfügbar.
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-[10px] bg-cream p-6 lg:p-8">
          <h2 className="font-body text-xl tracking-[0.1em]">BESTELLUNG</h2>
          <ul className="mt-5 space-y-3">
            {checkout.lines.map((line) => (
              <li key={line.id} className="flex justify-between gap-4 font-body text-[15px]">
                <span>
                  {line.quantity} × {line.variant.product.name}{" "}
                  <span className="italic text-latte">({line.variant.name})</span>
                </span>
                <span>
                  {formatPrice(line.totalPrice.gross.amount, line.totalPrice.gross.currency)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-sand/60 pt-4 font-body text-[15px]">
            <div className="flex justify-between">
              <dt className="text-latte">Zwischensumme</dt>
              <dd>
                {formatPrice(checkout.subtotalPrice.gross.amount, checkout.subtotalPrice.gross.currency)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-latte">Versand</dt>
              <dd>
                {checkout.deliveryMethod
                  ? formatPrice(checkout.shippingPrice.gross.amount, checkout.shippingPrice.gross.currency)
                  : "—"}
              </dd>
            </div>
            <div className="flex justify-between pt-2 text-lg">
              <dt>Gesamt</dt>
              <dd>{formatPrice(total.amount, total.currency)}</dd>
            </div>
          </dl>
          <p className="mt-6 rounded-lg bg-parchment p-4 text-center font-body text-sm text-latte">
            Die Bezahlung erfolgt sicher über <strong className="text-cocoa">PayPal</strong> in
            Schritt 3.
          </p>
          <Link
            href="/cart"
            className="mt-4 block text-center font-body text-sm text-latte underline-offset-2 hover:text-gold hover:underline"
          >
            Zurück zum Warenkorb
          </Link>
        </aside>
      </div>
    </main>
  );
}
