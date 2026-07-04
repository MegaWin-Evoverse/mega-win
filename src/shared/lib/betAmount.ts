import { BET_AMOUNT_DECIMALS, BET_AMOUNT_STEP } from '@/shared/config';

function toBetText(value: number): string {
  return value.toFixed(BET_AMOUNT_DECIMALS);
}

export function sanitizeBetInput(val: string, balance: number): string {
  let cleaned = val.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }
  const parsed = parseFloat(cleaned);
  if (!isNaN(parsed) && parsed > balance) {
    return balance.toFixed(BET_AMOUNT_DECIMALS);
  }
  return cleaned;
}

export function normalizeBetValue(raw: string): string {
  const parsed = parseFloat(raw);
  if (isNaN(parsed) || parsed <= 0) return '1.00';
  return parsed.toFixed(BET_AMOUNT_DECIMALS);
}

export function calcHalfBet(current: string): string {
  const parsed = Number.parseFloat(current) || 0;
  return toBetText(Math.max(1.0, parsed * BET_AMOUNT_STEP.HALF));
}

export function calcDoubleBet(current: string, balance: number): string {
  const parsed = Number.parseFloat(current) || 0;
  return toBetText(Math.min(balance, parsed * BET_AMOUNT_STEP.DOUBLE));
}

export function calcMaxBet(balance: number): string {
  return toBetText(balance);
}
