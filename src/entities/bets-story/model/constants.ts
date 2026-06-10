import type { Path } from './types';

export const TAB_LABELS: Record<Path, string> = {
  latest: 'All bets',
  'high-rollers': 'High rollers',
  lucky: 'Lucky bets',
  my: 'Your bets',
} as const;

export const TAB_PATHS: Path[] = ['latest', 'high-rollers', 'lucky', 'my'];

export const COLUMN_HEADERS = {
  USER: 'User',
  GAME: 'Game',
  BET: 'Bet',
  MULTIPLIER: 'Multiplier',
  PRIZE: 'Prize',
} as const;
