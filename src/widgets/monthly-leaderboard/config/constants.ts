import { ROUTES } from '@/shared/config';

export interface LeaderCardData {
  id: string;
  username: string;
  wageredAmount: string;
  rewardAmount: string;
  avatarSrc: string;
  rankIconSrc: string;
  champIconSrc: string;
  rank: 1 | 2 | 3;
}

export interface LeaderboardDecoration {
  id: string;
  src: string;
  width: number;
  height: number;
  wrapperClass: string;
  imageClass: string;
}

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

export const LEADERBOARD_PLAYERS: readonly LeaderCardData[] = [
  {
    id: 'leader-2',
    username: 'Username',
    wageredAmount: '1,234.567',
    rewardAmount: '1,500.00',
    avatarSrc: '/monthly-leaderboard/avatar-2.webp',
    rankIconSrc: '/monthly-leaderboard/rank-2.webp',
    champIconSrc: '/monthly-leaderboard/champ-2.svg',
    rank: 2,
  },
  {
    id: 'leader-1',
    username: 'Username',
    wageredAmount: '1,234.567',
    rewardAmount: '1,500.00',
    avatarSrc: '/monthly-leaderboard/avatar-1.webp',
    rankIconSrc: '/monthly-leaderboard/rank-1.webp',
    champIconSrc: '/monthly-leaderboard/champ-1.svg',
    rank: 1,
  },
  {
    id: 'leader-3',
    username: 'Username',
    wageredAmount: '1,234.567',
    rewardAmount: '1,500.00',
    avatarSrc: '/monthly-leaderboard/avatar-3.webp',
    rankIconSrc: '/monthly-leaderboard/rank-3.webp',
    champIconSrc: '/monthly-leaderboard/champ-3.svg',
    rank: 3,
  },
] as const;

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
