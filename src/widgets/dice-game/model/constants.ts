export const MIN_ROLLOVER = 2;
export const MAX_ROLLOVER = 98;
export const DEFAULT_ROLLOVER = 50;
export const STEP = 0.5;
export const HOUSE_EDGE = 0.99;
export const MAX_HISTORY = 6;
export const ROLL_DECIMALS = 2;
export const STATS_DECIMALS = 2;
export const CHANCE_DECIMALS = 4;
export const BET_DECIMALS = 2;
export const ROLL_ABOVE = true;
export const TICK_MARKS = [2, 25, 50, 75, 100] as const;
export const LABELS = {
  MULTIPLIER: 'Multiplier',
  ROLLOVER: 'Rollover',
  CHANCE: 'Chance',
  BET_ERROR: 'Failed to place bet. Please try again.',
} as const;
