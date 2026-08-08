"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PayPalPayment({
  clientId,
  currency,
}: {
  clientId: string;
  currency: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="max-w-md">
      <PayPalScriptProvider
        options={{ clientId, currency, intent: "capture", locale: "de_DE" }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
          createOrder={async () => {
            setError(null);
            const res = await fetch("/api/paypal/create-order", { method: "POST" });
            const data = (await res.json()) as { id?: string; error?: string };
            if (!res.ok || !data.id) {
              throw new Error(data.error ?? "PayPal-Bestellung fehlgeschlagen");
            }
            return data.id;
          }}
          onApprove={async (data) => {
            const res = await fetch("/api/paypal/capture", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID }),
            });
            const json = (await res.json()) as { orderNumber?: string; error?: string };
            if (!res.ok || !json.orderNumber) {
              setError(json.error ?? "Zahlung fehlgeschlagen");
              return;
            }
            window.dispatchEvent(new Event("cart:updated"));
            router.push(`/checkout/success?order=${encodeURIComponent(json.orderNumber)}`);
          }}
          onError={() => setError("PayPal-Fehler — bitte versuchen Sie es erneut")}
        />
      </PayPalScriptProvider>
      {error && <p className="mt-2 font-body text-sm text-red-700">{error}</p>}
    </div>
  );
}
