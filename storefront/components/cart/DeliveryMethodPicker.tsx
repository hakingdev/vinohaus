"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { selectDeliveryMethod } from "@/lib/cart/actions";
import type { Checkout } from "@/lib/cart/queries";
import { formatPrice } from "@/lib/utils";

export function DeliveryMethodPicker({
  methods,
  selectedId,
}: {
  methods: Checkout["shippingMethods"];
  selectedId: string | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <ul className={`space-y-2 ${pending ? "opacity-60" : ""}`}>
      {methods.map((method) => (
        <li key={method.id}>
          <label
            className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 font-body text-[15px] transition-colors ${
              method.id === selectedId
                ? "border-gold bg-parchment"
                : "border-sand/70 hover:border-gold/60"
            }`}
          >
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="delivery"
                checked={method.id === selectedId}
                disabled={pending}
                onChange={() =>
                  startTransition(async () => {
                    await selectDeliveryMethod(method.id);
                    router.refresh();
                  })
                }
                className="accent-[#af6900]"
              />
              {method.name}
            </span>
            <span className="text-latte">
              {formatPrice(method.price.amount, method.price.currency)}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
