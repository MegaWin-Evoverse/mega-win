import { Link2, ShoppingCart, Archive, Users, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from '@/shared/config';

export interface UserMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const USER_MENU_ITEMS: UserMenuItem[] = [
  { label: 'Connections', href: ROUTES.CONNECTIONS, icon: Link2 },
  { label: 'Points Shop', href: ROUTES.POINTSHOP, icon: ShoppingCart },
  { label: 'Bets History', href: ROUTES.BETS_HISTORY, icon: Archive },
  { label: 'Affiliates', href: ROUTES.AFFILIATES, icon: Users },
  { label: 'Seed history', href: ROUTES.SEED_HISTORY, icon: Shield },
];

export const LOGOUT_LABEL = 'Logout';
export const BALANCE_HEADER = 'Points Balance';
export const EXCHANGE_LABEL = 'Exchange Points';
export const GAME_POINTS_LABEL = 'Game Points';
export const WATCH_POINTS_LABEL = 'Watch Points';
export const LOGOUT_ERROR = 'Failed to log out';
