// TODO: Warenkorb = Saleor Checkout-Objekt.
// Ablauf: checkoutCreate beim ersten "In den Warenkorb", Checkout-ID in einem
// Cookie halten, danach checkoutLinesAdd / checkoutLinesUpdate.
export default function CartPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Warenkorb</h1>
      <p className="mt-4 text-neutral-500">
        Der Warenkorb ist noch nicht angebunden — als Nächstes wird hier das
        Saleor-Checkout-Objekt (checkoutCreate / checkoutLinesAdd) integriert.
      </p>
    </section>
  );
}
