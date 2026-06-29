import { Link2, Archive, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from '@/shared/config';

export interface UserMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const TAB_QUERY_KEY = 'tab';

const PROFILE_TAB_QUERY = {
  CONNECTIONS: 'connections',
  BETS_HISTORY: 'bets-history',
  SEED_HISTORY: 'seed-history',
} as const;

export const USER_MENU_ITEMS: UserMenuItem[] = [
  {
    label: 'Connections',
    href: `${ROUTES.PROFILE}?${TAB_QUERY_KEY}=${PROFILE_TAB_QUERY.CONNECTIONS}`,
    icon: Link2,
  },
  {
    label: 'Bets History',
    href: `${ROUTES.PROFILE}?${TAB_QUERY_KEY}=${PROFILE_TAB_QUERY.BETS_HISTORY}`,
    icon: Archive,
  },
  {
    label: 'Seed History',
    href: `${ROUTES.PROFILE}?${TAB_QUERY_KEY}=${PROFILE_TAB_QUERY.SEED_HISTORY}`,
    icon: Shield,
  },
];

export const PROFILE_LABEL = 'Profile';
export const LOGOUT_LABEL = 'Logout';
export const BALANCE_HEADER = 'Points Balance';
export const EXCHANGE_LABEL = 'Exchange Points';
export const GAME_POINTS_LABEL = 'Game Points';
export const WATCH_POINTS_LABEL = 'Watch Points';
export const LOGOUT_ERROR = 'Failed to log out';
