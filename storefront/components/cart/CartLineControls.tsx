"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { removeLine, updateLineQuantity } from "@/lib/cart/actions";

export function CartLineControls({ lineId, quantity }: { lineId: string; quantity: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const run = (fn: () => Promise<{ ok: boolean }>) => {
    startTransition(async () => {
      await fn();
      window.dispatchEvent(new Event("cart:updated"));
      router.refresh();
    });
  };

  return (
    <div className={`flex items-center gap-3 ${pending ? "opacity-50" : ""}`}>
      <div className="flex items-center border border-sand/80">
        <button
          type="button"
          aria-label="Menge verringern"
          disabled={pending}
          onClick={() => run(() => updateLineQuantity(lineId, quantity - 1))}
          className="px-3 py-1.5 font-body text-lg hover:text-gold"
        >
          −
        </button>
        <span className="min-w-8 text-center font-body">{quantity}</span>
        <button
          type="button"
          aria-label="Menge erhöhen"
          disabled={pending}
          onClick={() => run(() => updateLineQuantity(lineId, quantity + 1))}
          className="px-3 py-1.5 font-body text-lg hover:text-gold"
        >
          +
        </button>
      </div>
      <button
        type="button"
        aria-label="Entfernen"
        disabled={pending}
        onClick={() => run(() => removeLine(lineId))}
        className="font-body text-sm italic text-latte underline-offset-2 hover:text-gold hover:underline"
      >
        entfernen
      </button>
    </div>
  );
}
