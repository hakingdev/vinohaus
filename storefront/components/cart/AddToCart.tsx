"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { addToCart } from "@/lib/cart/actions";

export type VariantOption = {
  id: string;
  name: string;
  price: string | null;
};

export function AddToCart({ variants }: { variants: VariantOption[] }) {
  const router = useRouter();
  const [variantId, setVariantId] = useState(variants[0]?.id ?? null);
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  if (variants.length === 0) {
    return <p className="mt-6 font-body text-[15px] italic text-latte">Derzeit nicht verfügbar.</p>;
  }

  const submit = () => {
    if (!variantId) return;
    setFeedback(null);
    startTransition(async () => {
      const res = await addToCart(variantId);
      if (res.ok) {
        setFeedback({ ok: true, text: "Im Warenkorb ✓" });
        window.dispatchEvent(new Event("cart:updated"));
        router.refresh();
      } else {
        setFeedback({ ok: false, text: res.message ?? "Fehler beim Hinzufügen" });
      }
    });
  };

  return (
    <div className="mt-6">
      <ul className="space-y-2">
        {variants.map((variant) => (
          <li key={variant.id}>
            <label
              className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 font-body text-sm transition-colors lg:text-base ${
                variant.id === variantId
                  ? "border-gold bg-cream"
                  : "border-sand/70 hover:border-gold/60"
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="variant"
                  checked={variant.id === variantId}
                  onChange={() => setVariantId(variant.id)}
                  className="accent-[#af6900]"
                />
                {variant.name}
              </span>
              <span className="text-latte">{variant.price ?? "—"}</span>
            </label>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={submit}
        disabled={pending}
        className="mt-6 w-full rounded-[6px] bg-gold px-6 py-4 font-body text-lg text-parchment transition-colors hover:bg-honey disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Wird hinzugefügt…" : "In den Warenkorb"}
      </button>

      {feedback && (
        <p
          className={`mt-3 text-center font-body text-sm ${
            feedback.ok ? "text-gold" : "text-red-700"
          }`}
        >
          {feedback.text}
        </p>
      )}
    </div>
  );
}
