type GraphQLErrorItem = { message: string };
type GraphQLResponse<TData> = { data?: TData; errors?: GraphQLErrorItem[] };

export const CHANNEL = process.env.NEXT_PUBLIC_SALEOR_CHANNEL ?? "default-channel";

export class SaleorApiError extends Error {}

export async function saleorFetch<TData>({
  query,
  variables,
  tags,
  revalidate,
}: {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
}): Promise<TData> {
  const apiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;
  if (!apiUrl) {
    throw new SaleorApiError(
      "NEXT_PUBLIC_SALEOR_API_URL is not set — copy .env.example to .env.local and fill in your Saleor instance URL"
    );
  }

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { tags, revalidate },
  });

  if (!res.ok) {
    throw new SaleorApiError(`Saleor API responded with HTTP ${res.status}`);
  }

  const json = (await res.json()) as GraphQLResponse<TData>;
  if (json.errors?.length) {
    throw new SaleorApiError(json.errors.map((e) => e.message).join("; "));
  }
  return json.data as TData;
}
