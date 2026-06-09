import { GAME_BALANCE } from '@/shared/config';

export const KENO_RISK = {
  CLASSIC: 'classic',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export type KenoRisk = (typeof KENO_RISK)[keyof typeof KENO_RISK];

export const KENO_RISK_OPTIONS = [
  { value: KENO_RISK.CLASSIC, label: 'Classic', className: 'text-risk-classic' },
  { value: KENO_RISK.LOW, label: 'Low', className: 'text-risk-low' },
  { value: KENO_RISK.MEDIUM, label: 'Medium', className: 'text-risk-medium' },
  { value: KENO_RISK.HIGH, label: 'High', className: 'text-risk-high' },
] as const;

export const KENO_LABELS = {
  RISK: 'Risk',
  CLEAR_TABLE: 'Clear Table',
  AUTO_PICK: 'Auto Pick',
  BET: 'Bet',
} as const;

export const KENO_DEFAULTS = {
  BALANCE: GAME_BALANCE,
  BET_AMOUNT_TEXT: '0.00',
  NUMBER_OF_BETS: '0',
  RISK: KENO_RISK.CLASSIC,
} as const;

export { BET_AMOUNT_DECIMALS, BET_AMOUNT_STEP } from '@/shared/config';
