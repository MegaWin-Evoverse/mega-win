import { ROUTES } from '@/shared/config';
import type { LeaderboardDecoration } from './types';

export const LEADERBOARD_CONSTANTS = {
  SECTION_TITLE: 'Monthly Leaderboard',
  SECTION_DESCRIPTION:
    'Players who wager using code MEGAWIN on DegenCity are automatically entered',
  SECTION_ARIA_LABEL: 'Monthly Leaderboard promotions',
  VIEW_ALL_BUTTON: 'View all',
} as const;

export const LEADERBOARD_BACKDROP = {
  src: '/monthly-leaderboard/backdrop.svg',
} as const;

export const LEADERBOARD_ROUTE = ROUTES.LEADERBOARD;

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
