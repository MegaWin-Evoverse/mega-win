import { CountdownValues } from './types';

export const LEADERBOARD_LABELS = {
  TITLE: "The Doctor's End of Month Bonus Buy Competition!",
  SUBTITLE: 'Be a Top 1000 player in January and win a live Bonus Buy with TheDoctor',
  WAGERED: 'WAGERED',
  JOIN_BUTTON: 'Join the leaderboard',
  SHOW_MORE_BUTTON: 'Show more',
  COUNTDOWN_TITLE: 'Competition ends in:',
  INFO_PRE: 'Only registered and',
  INFO_BOLD: 'Super Confirmed',
  INFO_MID: 'players wagering with code',
  INFO_CODE: 'MEGAWIN',
  INFO_END: 'are ranked',
  COL_RANK: 'Rank',
  COL_USERNAME: 'Username',
  COL_WAGERED: 'Wagered',
  COL_PRIZE: 'Prize',
  COUNTDOWN_D: 'D',
  COUNTDOWN_H: 'H',
  COUNTDOWN_M: 'M',
  COUNTDOWN_S: 'S',
  NO_PRIZE: '—',
} as const;

export const PODIUM_ORDER = [2, 1, 3] as const;

export const PODIUM_AVATAR_SRC: Record<1 | 2 | 3, string> = {
  1: '/monthly-leaderboard/avatar-1.webp',
  2: '/monthly-leaderboard/avatar-2.webp',
  3: '/monthly-leaderboard/avatar-3.webp',
};

export const PODIUM_RANK_ICON_SRC: Record<1 | 2 | 3, string> = {
  1: '/monthly-leaderboard/rank-1.webp',
  2: '/monthly-leaderboard/rank-2.webp',
  3: '/monthly-leaderboard/rank-3.webp',
};

export const PODIUM_CHAMP_ICON_SRC: Record<1 | 2 | 3, string> = {
  1: '/monthly-leaderboard/champ-1.svg',
  2: '/monthly-leaderboard/champ-2.svg',
  3: '/monthly-leaderboard/champ-3.svg',
};

export const LEADERBOARD_SIZES = {
  AVATAR: 94,
  RANK_ICON: 60,
  CHAMP_ICON: 24,
  COIN_ICON: 18,
} as const;

export const INITIAL_VISIBLE_ROWS = 10;

export const ROWS_PER_LOAD = 10;

export const TOP_3_THRESHOLD = 3;

export const COUNTDOWN_UNITS = [
  { key: 'days', label: LEADERBOARD_LABELS.COUNTDOWN_D },
  { key: 'hours', label: LEADERBOARD_LABELS.COUNTDOWN_H },
  { key: 'minutes', label: LEADERBOARD_LABELS.COUNTDOWN_M },
  { key: 'seconds', label: LEADERBOARD_LABELS.COUNTDOWN_S },
] as const;

export const PODIUM_CLASSES = [
  'order-2 sm:order-1 sm:translate-y-2',
  'order-1 sm:order-2 sm:-translate-y-6 z-20',
  'order-3 sm:order-3 sm:translate-y-4',
] as const;

export const INITIAL_VALUES: CountdownValues = {
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
};
