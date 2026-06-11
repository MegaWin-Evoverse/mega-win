import { GAME_BALANCE } from '@/shared/config';

export const KENO_RISK = {
  CLASSIC: 'classic',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export type KenoRisk = (typeof KENO_RISK)[keyof typeof KENO_RISK];

export const KENO_GAME_PHASE = {
  IDLE: 'idle',
  PICKING: 'picking',
  RESULT: 'result',
} as const;

export type KenoGamePhase = (typeof KENO_GAME_PHASE)[keyof typeof KENO_GAME_PHASE];

export const KENO_TOTAL_NUMBERS = 40;
export const KENO_MAX_PICKS = 10;
export const KENO_DRAWS_COUNT = 20;
export const KENO_AUTO_PICK_COUNT = 5;

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
  SELECT_PROMPT: 'Select numbers 1-10 to start',
} as const;

export const KENO_DEFAULTS = {
  BALANCE: GAME_BALANCE,
  BET_AMOUNT_TEXT: '0.00',
  NUMBER_OF_BETS: '0',
  RISK: KENO_RISK.CLASSIC,
} as const;

// payouts[risk][picksCount - 1][matchCount] = multiplier
export const KENO_PAYOUTS: Record<KenoRisk, number[][]> = {
  [KENO_RISK.CLASSIC]: [
    [0, 3.96],
    [0, 1.9, 4.5],
    [0, 1, 2.5, 8.5],
    [0, 0.5, 1.4, 4, 15],
    [0, 0.25, 1.4, 4.1, 16.5, 36],
    [0, 0, 1, 3, 8, 20, 50],
    [0, 0, 0.5, 1.5, 5, 15, 50, 100],
    [0, 0, 0, 0.5, 2, 8, 25, 100, 200],
    [0, 0, 0, 0, 1, 4, 12, 50, 150, 400],
    [0, 0, 0, 0, 0.5, 1.4, 4, 16.5, 100, 200, 500],
  ],
  [KENO_RISK.LOW]: [
    [0, 2.8],
    [0, 1.4, 3.8],
    [0, 0.8, 2.2, 6.5],
    [0, 0.4, 1.2, 3.5, 12],
    [0, 0.2, 1.1, 3.5, 14, 28],
    [0, 0, 0.8, 2.5, 7, 18, 40],
    [0, 0, 0.4, 1.2, 4, 12, 40, 80],
    [0, 0, 0, 0.4, 1.8, 7, 22, 85, 160],
    [0, 0, 0, 0, 0.8, 3.5, 10, 45, 120, 320],
    [0, 0, 0, 0, 0.4, 1.2, 3.5, 14, 85, 160, 400],
  ],
  [KENO_RISK.MEDIUM]: [
    [0, 3.5],
    [0, 1.7, 4.2],
    [0, 0.9, 2.4, 7.5],
    [0, 0.45, 1.3, 3.8, 13],
    [0, 0.22, 1.3, 3.8, 15, 32],
    [0, 0, 0.9, 2.8, 7.5, 18, 45],
    [0, 0, 0.45, 1.4, 4.5, 14, 45, 90],
    [0, 0, 0, 0.45, 1.9, 7.5, 23, 92, 180],
    [0, 0, 0, 0, 0.9, 3.8, 11, 47, 135, 360],
    [0, 0, 0, 0, 0.45, 1.3, 3.8, 15, 92, 180, 450],
  ],
  [KENO_RISK.HIGH]: [
    [0, 5],
    [0, 2.5, 7],
    [0, 1.5, 4, 15],
    [0, 0.7, 2, 6, 25],
    [0, 0.35, 2, 6, 25, 60],
    [0, 0, 1.5, 5, 13, 35, 100],
    [0, 0, 0.8, 2.5, 8, 25, 85, 200],
    [0, 0, 0, 0.8, 3, 12, 40, 180, 400],
    [0, 0, 0, 0, 1.5, 6, 18, 80, 250, 700],
    [0, 0, 0, 0, 0.8, 2, 6, 25, 150, 350, 900],
  ],
};

export { BET_AMOUNT_DECIMALS, BET_AMOUNT_STEP } from '@/shared/config';
