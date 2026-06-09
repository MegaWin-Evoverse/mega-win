import { GAME_BALANCE } from '@/shared/config';

export const ROULETTE_LABELS = {
  CHIP_VALUE: 'Chip Value',
  BET_AMOUNT: 'Bet Amount',
  CHOOSE_ACTION: 'Choose action',
  CLEAR: 'Clear',
  UNDO: 'Undo',
  BET: 'Bet',
  COINS: 'COINS',
} as const;

export const ROULETTE_DEFAULTS = {
  BALANCE: GAME_BALANCE,
  NUMBER_OF_BETS: '10',
} as const;

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
