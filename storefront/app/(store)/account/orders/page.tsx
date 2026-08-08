// TODO: Bestellhistorie über die `me { orders }` Query, sobald Auth steht.
export default function OrdersPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Meine Bestellungen</h1>
      <p className="mt-4 text-neutral-500">
        Die Bestellhistorie wird nach der Anbindung des Kundenlogins verfügbar.
      </p>
    </section>
  );
}
