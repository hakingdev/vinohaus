export function formatPrice(amount: number, currency: string, locale = "de-DE") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

// Grundpreisangabe (PAngV): price per litre is legally required next to the bottle price.
export function pricePerLiter(amount: number, volumeLiters: number, currency: string) {
  if (volumeLiters <= 0) return null;
  return `${formatPrice(amount / volumeLiters, currency)} / l`;
}
