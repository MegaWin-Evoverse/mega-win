const MONTH_PAD_LENGTH = 2;
const MONTH_PAD_CHAR = '0';

export function getCurrentMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(MONTH_PAD_LENGTH, MONTH_PAD_CHAR);

  return `${year}-${month}`;
}
