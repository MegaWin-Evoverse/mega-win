import type { Path } from './types';

export const TAB_LABELS: Record<Path, string> = {
  latest: 'All bets',
  'high-rollers': 'High rollers',
  lucky: 'Lucky bets',
  my: 'Your bets',
} as const;

export const TAB_PATHS: Path[] = ['latest', 'high-rollers', 'lucky', 'my'];
export const LIVE_TAB_PATHS: Path[] = ['latest', 'high-rollers', 'lucky'];

export const BETS_STORY_LIVE_TITLE = 'Bet Live';
export const BETS_STORY_EMPTY_MESSAGE = 'No bets yet';

export const BETS_STORY_STALE_TIME = 0;

export const COLUMN_HEADERS = {
  USER: 'User',
  GAME: 'Game',
  BET: 'Bet',
  MULTIPLIER: 'Multiplier',
  PRIZE: 'Prize',
} as const;
