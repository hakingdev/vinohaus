// TODO: eigener Checkout auf Basis der Saleor Checkout API:
// 1. Checkout aus Cookie laden (checkout(id:))
// 2. checkoutEmailUpdate + checkoutShippingAddressUpdate
// 3. checkoutDeliveryMethodUpdate (Versandart)
// 4. Zahlung über eine Payment-App (Stripe/Mollie) + transactionInitialize
// 5. checkoutComplete → Order
export default function CheckoutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Kasse</h1>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-neutral-600">
        <li>Kontakt & Lieferadresse</li>
        <li>Versandart (DHL, Alterssichtprüfung 18+)</li>
        <li>Zahlung</li>
        <li>Bestellübersicht & Abschluss</li>
      </ol>
      <p className="mt-6 text-sm text-neutral-500">
        Der Checkout-Flow wird gegen die Saleor Checkout API implementiert — siehe
        TODO-Kommentar in dieser Datei.
      </p>
    </main>
  );
}
