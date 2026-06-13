import { GAME_BALANCE } from '@/shared/config';

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

// Pause between auto-bet spins (must stay below RESULT_OVERLAY_DURATION_MS so the
// next spin starts before the result overlay auto-dismisses).
export const AUTO_BET_DELAY_MS = 1200;

export const ROULETTE_DEFAULTS = {
  BALANCE: GAME_BALANCE,
  NUMBER_OF_BETS: '10',
} as const;

export const MIN_AUTO_BET_COUNT = 1;

export const RESULT_OVERLAY_DURATION_MS = 2000;

export const CHIP_NOMINALS = [
  '1',
  '5',
  '10',
  '25',
  '50',
  '100',
  '250',
  '500',
  '1K',
  '2K',
  '5K',
  '10K',
  '25K',
  '50K',
  '100K',
] as const;

export type ChipNominal = (typeof CHIP_NOMINALS)[number];

// Designer-given chip stripe palette — the single source for every chip rendering
// (controls grid and table stacks). Keyed by nominal.
export const CHIP_STRIPES: Record<ChipNominal, string> = {
  '1': '#FFFFFF',
  '5': '#75D2FD',
  '10': '#018BCB',
  '25': '#FFBABA',
  '50': '#FF4D4D',
  '100': '#EC0303',
  '250': '#9CFFC5',
  '500': '#35FF89',
  '1K': '#35FF89',
  '2K': '#F3FF9C',
  '5K': '#B2C807',
  '10K': '#B2C807',
  '25K': '#CDB1FE',
  '50K': '#9A5FFF',
  '100K': '#6208FF',
};

export function getChipStripe(nominal: string): string {
  return CHIP_STRIPES[nominal as ChipNominal] ?? CHIP_STRIPES['1'];
}

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

// Single source for bet zone keys: store, table cells and the bet payload builder
// must all agree on this format (`<type>-<value>`).
export function betZoneKey(type: BetType, value: string | number): string {
  return `${type}-${value}`;
}

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

const CHIP_K_MULTIPLIER = 1000;

export function parseChipValue(nominal: string): number {
  if (nominal.endsWith('K')) {
    return parseFloat(nominal.slice(0, -1)) * CHIP_K_MULTIPLIER;
  }
  return parseFloat(nominal);
}
