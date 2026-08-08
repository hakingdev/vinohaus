"use client";

import { useActionState } from "react";

import { saveCheckoutContact, type ContactFormState } from "@/lib/cart/actions";
import type { CheckoutAddress } from "@/lib/cart/queries";

const initialState: ContactFormState = { ok: false, message: "" };

function Field({
  label,
  name,
  type = "text",
  required = true,
  defaultValue,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="font-body text-sm text-latte">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="mt-1 w-full rounded-md border border-sand/80 bg-parchment px-4 py-2.5 font-body text-[15px] outline-none focus:border-gold"
      />
    </label>
  );
}

export function AddressForm({
  email,
  address,
}: {
  email: string | null;
  address: CheckoutAddress | null;
}) {
  const [state, formAction, pending] = useActionState(saveCheckoutContact, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <Field
        label="E-Mail"
        name="email"
        type="email"
        defaultValue={email ?? ""}
        autoComplete="email"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Vorname"
          name="firstName"
          defaultValue={address?.firstName}
          autoComplete="given-name"
        />
        <Field
          label="Nachname"
          name="lastName"
          defaultValue={address?.lastName}
          autoComplete="family-name"
        />
      </div>
      <Field
        label="Straße und Hausnummer"
        name="streetAddress1"
        defaultValue={address?.streetAddress1}
        autoComplete="street-address"
      />
      <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
        <Field
          label="PLZ"
          name="postalCode"
          defaultValue={address?.postalCode}
          autoComplete="postal-code"
        />
        <Field label="Stadt" name="city" defaultValue={address?.city} autoComplete="address-level2" />
      </div>
      <Field
        label="Telefon (optional)"
        name="phone"
        type="tel"
        required={false}
        defaultValue={address?.phone ?? ""}
        autoComplete="tel"
      />
      <p className="font-body text-sm italic text-latte">Land: Deutschland</p>

      <button
        type="submit"
        disabled={pending}
        className="rounded-[6px] bg-gold px-8 py-3.5 font-body text-lg text-parchment transition-colors hover:bg-honey disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Wird gespeichert…" : "Speichern"}
      </button>

      {state.message && (
        <p className={`font-body text-sm ${state.ok ? "text-gold" : "text-red-700"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
