// TODO: Kundenlogin über @saleor/auth-sdk (tokenCreate / Refresh-Flow).
export default function LoginPage() {
  return (
    <section className="mx-auto w-full max-w-sm px-4 py-8">
      <h1 className="text-2xl font-semibold">Anmelden</h1>
      <form className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="E-Mail"
          disabled
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="Passwort"
          disabled
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm"
        />
        <button
          disabled
          className="w-full cursor-not-allowed rounded-lg bg-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-600"
        >
          Anmelden (Auth folgt)
        </button>
      </form>
    </section>
  );
}
