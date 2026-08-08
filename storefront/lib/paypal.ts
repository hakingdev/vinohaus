// Server-side PayPal REST client (Orders API v2).
// Uses sandbox by default; set PAYPAL_API_BASE=https://api-m.paypal.com for live.

const API_BASE = process.env.PAYPAL_API_BASE ?? "https://api-m.sandbox.paypal.com";

export class PayPalError extends Error {}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !secret) {
    throw new PayPalError("PayPal credentials are not configured");
  }

  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new PayPalError(`PayPal auth failed: HTTP ${res.status}`);
  const json = (await res.json()) as { access_token: string };
  return json.access_token;
}

async function paypalFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  const json = (await res.json().catch(() => null)) as T | null;
  if (!res.ok) {
    throw new PayPalError(`PayPal API ${path}: HTTP ${res.status} ${JSON.stringify(json)}`);
  }
  return json as T;
}

type PayPalAmount = { currency_code: string; value: string };

export type PayPalOrder = {
  id: string;
  status: string;
  purchase_units: {
    custom_id?: string;
    amount: PayPalAmount;
    payments?: { captures?: { id: string; status: string; amount: PayPalAmount }[] };
  }[];
};

export async function createPayPalOrder(
  amount: number,
  currency: string,
  checkoutId: string
): Promise<PayPalOrder> {
  return paypalFetch<PayPalOrder>("/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: checkoutId,
          amount: { currency_code: currency, value: amount.toFixed(2) },
        },
      ],
    }),
  });
}

export async function getPayPalOrder(orderId: string): Promise<PayPalOrder> {
  return paypalFetch<PayPalOrder>(`/v2/checkout/orders/${orderId}`, { method: "GET" });
}

export async function capturePayPalOrder(orderId: string): Promise<PayPalOrder> {
  return paypalFetch<PayPalOrder>(`/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
  });
}
