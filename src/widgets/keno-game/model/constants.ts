import type { Risk } from '@/entities/game';
import type { CellState } from './types';

export const KENO_BET_ENDPOINT = '/api/games/house/keno/bet';

export const TOTAL_NUMBERS = 40;
export const DRAWN_COUNT = 20;
export const MAX_PICKS = 10;
export const MIN_PICKS = 1;
export const DEFAULT_BET = 100;
export const MULTIPLIER_DECIMALS = 2;
export const BET_DECIMALS = 2;
export const REVEAL_DELAY_MS = 80;
export const RESULT_DELAY_MS = 400;
export const AUTO_PICK_DELAY_MS = 100;
export const AUTO_BET_DELAY_MS = 1500;

export const LABELS = {
  SELECT_PROMPT: 'Select numbers 1-10 to start',
  PLAY: 'Play',
  PLAY_AGAIN: 'Play Again',
  WIN_TROPHY_ARIA: 'Win',
  WIN_COIN_ALT: 'Bet amount',
  WIN_MATCHES_ALT: 'Matches',
  BET_ERROR: 'Failed to place bet. Please try again.',
} as const;

export const NUMBERS = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);

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

export const PAYOUTS_BY_RISK: Readonly<Record<Risk, readonly number[]>> = {
  classic: [0, 0, 0, 1.4, 2.25, 4.5, 8, 17, 50, 80, 100],
  low: [0, 0, 1.1, 1.2, 1.3, 1.8, 3.5, 13, 50, 250, 1000],
  medium: [0, 0, 0, 1.6, 2, 4, 7, 26, 100, 500, 1000],
  high: [0, 0, 0, 0, 3.5, 8, 13, 63, 500, 800, 1000],
};

export const PICK_CHANCES: readonly number[] = [
  3.5, 16.9, 31.1, 28.8, 14.7, 4.2, 0.7, 0.1, 0.0, 0.0, 0.0,
];

export const PAYOUT_TOOLTIP_LABELS = {
  MULTIPLIER: 'Multiplier',
  PROFIT: 'Profit',
  CHANCE: 'Chance',
  CHANCE_UNIT: '%',
} as const;
