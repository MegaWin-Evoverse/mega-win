import type { PodiumPosition } from './types';

export const TOP_3_THRESHOLD = 3;

export const PODIUM_ORDER = [2, 1, 3] as const;

export const PODIUM_SKELETON_COUNT = 3;

export const PODIUM_LABELS = {
  WAGERED: 'WAGERED',
  EMPTY_STATE_TITLE: 'No participants yet',
  EMPTY_STATE_MESSAGE: 'Be the first to join the competition and claim the top spot!',
} as const;

export const PODIUM_SIZES = {
  AVATAR: 94,
  RANK_ICON: 60,
  CHAMP_ICON: 24,
} as const;

export const PODIUM_AVATAR_SRC: Record<PodiumPosition, string> = {
  1: '/monthly-leaderboard/avatar-1.webp',
  2: '/monthly-leaderboard/avatar-2.webp',
  3: '/monthly-leaderboard/avatar-3.webp',
};

export const PODIUM_RANK_ICON_SRC: Record<PodiumPosition, string> = {
  1: '/monthly-leaderboard/rank-1.webp',
  2: '/monthly-leaderboard/rank-2.webp',
  3: '/monthly-leaderboard/rank-3.webp',
};

export const PODIUM_CHAMP_ICON_SRC: Record<PodiumPosition, string> = {
  1: '/monthly-leaderboard/champ-1.svg',
  2: '/monthly-leaderboard/champ-2.svg',
  3: '/monthly-leaderboard/champ-3.svg',
};

export const PODIUM_CLASSES = [
  'order-2 sm:order-1 sm:translate-y-2',
  'order-1 sm:order-2 sm:-translate-y-6 z-20',
  'order-3 sm:order-3 sm:translate-y-4',
] as const;
