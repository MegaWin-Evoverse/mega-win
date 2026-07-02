import { ROUTES } from '@/shared/config';
import type { LeaderboardDecoration } from './types';

export const LEADERBOARD_CONSTANTS = {
  SECTION_TITLE: 'Monthly Leaderboard',
  SECTION_DESCRIPTION:
    'Players who wager using code MEGAWIN on DegenCity are automatically entered',
  SECTION_ARIA_LABEL: 'Monthly Leaderboard promotions',
  WAGERED_LABEL: 'Wagered',
  VIEW_ALL_BUTTON: 'View all',
  AVATAR_ALT_PREFIX: 'Avatar of ',
  RANK_ALT_PREFIX: 'Rank badge ',
  CHAMP_ALT_PREFIX: 'Trophy ',
  TOP_RANK: 1,
} as const;

export const LEADERBOARD_SIZES = {
  AVATAR: 94,
  RANK: 60,
  CHAMP: 24,
} as const;

export const LEADERBOARD_BACKDROP = {
  src: '/monthly-leaderboard/backdrop.svg',
} as const;

export const LEADERBOARD_ROUTE = ROUTES.LEADERBOARD;

export const PODIUM_ORDER = [2, 1, 3] as const;

export const PODIUM_CLASSES = [
  'order-2 sm:order-1 sm:translate-y-2',
  'order-1 sm:order-2 sm:-translate-y-6 z-20',
  'order-3 sm:order-3 sm:translate-y-4',
] as const;

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

export const TOP_3_THRESHOLD = 3;

export const LEADERBOARD_DECORATIONS: readonly LeaderboardDecoration[] = [
  {
    id: 'chips-right',
    src: '/monthly-leaderboard/chips.svg',
    width: 129,
    height: 233,
    wrapperClass: 'right-[-200px] top-[130px] w-[262px] h-[289px]',
    imageClass: 'rotate-[5deg]',
  },
  {
    id: 'chips-left',
    src: '/monthly-leaderboard/chips.svg',
    width: 129,
    height: 233,
    wrapperClass: 'left-[-70px] bottom-[-100px] w-[262px] h-[289px]',
    imageClass: 'rotate-[180deg]',
  },
  {
    id: 'rocket',
    src: '/monthly-leaderboard/rocket.svg',
    width: 215,
    height: 90,
    wrapperClass: 'right-[-150px] top-[-30px] w-[233px] h-[128px]',
    imageClass: 'rotate-[10.46deg]',
  },
] as const;
