const AMOUNT_LOCALE = 'en-US';
const FRACTION_DIGITS = 2;

export function formatAmount(value: number): string {
  return new Intl.NumberFormat(AMOUNT_LOCALE, {
    minimumFractionDigits: FRACTION_DIGITS,
    maximumFractionDigits: FRACTION_DIGITS,
  }).format(value);
}
