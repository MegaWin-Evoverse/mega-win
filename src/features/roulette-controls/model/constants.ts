export const ROULETTE_LABELS = {
  CHIP_VALUE: 'Chip Value',
  BET_AMOUNT: 'Bet Amount',
  CHOOSE_ACTION: 'Choose action',
  CLEAR: 'Clear',
  UNDO: 'Undo',
  BET: 'Bet',
  START_AUTOBET: 'Start Autobet',
  STOP_AUTOBET: 'Stop Autobet',
  COINS: 'COINS',
} as const;

export const MIN_AUTO_BET_COUNT = 1;
// Pause between auto-bet spins (must stay below RESULT_OVERLAY_DURATION_MS so the
// next spin starts before the result overlay auto-dismisses).
export const AUTO_BET_DELAY_MS = 1200;

export const RESULT_OVERLAY_DURATION_MS = 2000;

export const ROULETTE_BET_PATH = '/api/games/house/roulette/bet';

export const BET_ERROR_MESSAGES = {
  NO_BETS: 'Place at least one bet before spinning.',
  BELOW_MIN: (min: number) => `Minimum bet is ${min} coins.`,
  ABOVE_MAX: (max: number) => `Maximum bet is ${max} coins.`,
  UNAUTHORIZED: 'Please log in to place bets.',
  GENERIC: 'Failed to place bet. Please try again.',
} as const;

export const HTTP_UNAUTHORIZED = 401;

export const BET_TYPE = {
  STRAIGHT: 'straight',
  HALF: 'half',
  PARITY: 'parity',
  COLOR: 'color',
  COLUMN: 'column',
  DOZEN: 'dozen',
} as const;

export type BetType = (typeof BET_TYPE)[keyof typeof BET_TYPE];

export const COLUMN = {
  TOP: 'TOP',
  MIDDLE: 'MIDDLE',
  BOTTOM: 'BOTTOM',
} as const;

export type ColumnKey = (typeof COLUMN)[keyof typeof COLUMN];

export const DOZEN = {
  FIRST: 'FIRST',
  SECOND: 'SECOND',
  THIRD: 'THIRD',
} as const;

export type DozenKey = (typeof DOZEN)[keyof typeof DOZEN];

export const HALF = {
  LOW: 'LOW',
  HIGH: 'HIGH',
} as const;

export type HalfKey = (typeof HALF)[keyof typeof HALF];

export const PARITY = {
  ODD: 'ODD',
  EVEN: 'EVEN',
} as const;

export type ParityKey = (typeof PARITY)[keyof typeof PARITY];

export const COLOR = {
  RED: 'RED',
  BLACK: 'BLACK',
} as const;

export type ColorKey = (typeof COLOR)[keyof typeof COLOR];

export const ROULETTE_TABLE_LABELS = {
  COLUMN_2_TO_1: '2:1',
  DOZEN_FIRST: '1 to 12',
  DOZEN_SECOND: '13 to 24',
  DOZEN_THIRD: '25 to 36',
  HALF_LOW: '1 to 18',
  HALF_HIGH: '19 to 36',
  PARITY_EVEN: 'Even',
  PARITY_ODD: 'Odd',
} as const;
