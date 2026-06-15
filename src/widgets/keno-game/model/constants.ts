import type { CellState } from './types';

export const KENO_TOTAL_NUMBERS = 40;
export const KENO_DRAWN_COUNT = 20;
export const KENO_MAX_PICKS = 10;
export const KENO_MIN_PICKS = 1;
export const KENO_DEFAULT_BET = 100;
export const KENO_MULTIPLIER_DECIMALS = 2;
export const KENO_BET_DECIMALS = 2;
export const KENO_REVEAL_DELAY_MS = 80;
export const KENO_RESULT_DELAY_MS = 400;

export const KENO_LABELS = {
  SELECT_PROMPT: 'Select numbers 1-10 to start',
  PLAY: 'Play',
  PLAY_AGAIN: 'Play Again',
  WIN_TROPHY_ARIA: 'Win',
  WIN_COIN_ALT: 'Bet amount',
  WIN_MATCHES_ALT: 'Matches',
} as const;

export const KENO_PAYOUTS: Readonly<Record<number, readonly number[]>> = {
  1: [0, 3.96],
  2: [0, 1, 9],
  3: [0, 0, 2.7, 27],
  4: [0, 0, 1, 4.5, 75],
  5: [0, 0.25, 1.4, 4.1, 16.5, 36],
  6: [0, 0, 1, 3, 8, 50, 200],
  7: [0, 0, 0.5, 2, 6, 20, 100, 700],
  8: [0, 0, 0.5, 1.5, 4, 12, 50, 300, 1500],
  9: [0, 0, 0.5, 1, 3, 8, 25, 100, 500, 2500],
  10: [0, 0, 0.5, 1, 2, 6, 15, 50, 200, 1000, 5000],
} as const;

export const KENO_NUMBERS = Array.from({ length: KENO_TOTAL_NUMBERS }, (_, i) => i + 1);

export const CELL_STATE_CLASSES: Record<CellState, string> = {
  idle: 'bg-gradient-to-b from-brand-border to-brand-btn-gradient-to border border-keno-cell-border text-brand-text-white hover:brightness-125',
  selected:
    'bg-gradient-to-b from-brand-green-from to-brand-green-to text-brand-dark hover:brightness-110',
  hit: 'bg-gradient-to-b from-brand-green-from to-brand-green-to text-brand-dark',
  miss: 'bg-gradient-to-b from-brand-border/40 to-brand-btn-gradient-to/40 border border-keno-cell-border/30 text-brand-text-white/25',
  drawn:
    'bg-gradient-to-b from-brand-border to-brand-btn-gradient-to border border-destructive text-destructive',
};

export const PAYOUT_COLS: Readonly<Record<number, string>> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
} as const;
