import { ROUTES } from '@/shared/config/routes';

export type IconName =
  | 'pointshop'
  | 'leaderboard'
  | 'games'
  | 'rewards'
  | 'bonuses'
  | 'wheel'
  | 'winners'
  | 'roulette'
  | 'keno'
  | 'plinko'
  | 'dice';

export interface SidebarSubItem {
  label: string;
  href: string;
  iconName: IconName;
}

export interface SidebarMenuItemConfig {
  label: string;
  href: string;
  iconName: IconName;
  isCollapsible?: boolean;
  subItems?: SidebarSubItem[];
}

export const SIDEBAR_MENU_ITEMS: SidebarMenuItemConfig[] = [
  {
    label: 'Pointshop',
    href: ROUTES.POINTSHOP,
    iconName: 'pointshop',
  },
  {
    label: 'Leaderboard',
    href: ROUTES.LEADERBOARD,
    iconName: 'leaderboard',
  },
  {
    label: 'Games',
    href: ROUTES.GAMES,
    iconName: 'games',
    isCollapsible: true,
    subItems: [
      {
        label: 'Roulette',
        href: ROUTES.GAMES_ROULETTE,
        iconName: 'roulette',
      },
      {
        label: 'Keno',
        href: ROUTES.GAMES_KENO,
        iconName: 'keno',
      },
      {
        label: 'Plinko',
        href: ROUTES.GAMES_PLINKO,
        iconName: 'plinko',
      },
      {
        label: 'Dice',
        href: ROUTES.GAMES_DICE,
        iconName: 'dice',
      },
    ],
  },
  {
    label: 'Rewards',
    href: ROUTES.REWARDS,
    iconName: 'rewards',
  },
  {
    label: 'Bonuses',
    href: ROUTES.BONUSES,
    iconName: 'bonuses',
  },
  {
    label: 'The Wheel',
    href: ROUTES.THE_WHEEL,
    iconName: 'wheel',
  },
  {
    label: 'Bonus Buy Winners',
    href: ROUTES.BONUS_BUY_WINNERS,
    iconName: 'winners',
  },
];
