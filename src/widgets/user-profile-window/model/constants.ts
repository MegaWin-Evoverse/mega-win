import type { BetsSortKey, CryptoWalletKey, ProfileWindowTab } from './types';
import { User as UserIcon, History } from 'lucide-react';

export const PROFILE_WINDOW_TABS = {
  PROFILE: 'profile',
  BETS_HISTORY: 'bets-history',
} as const;

export const TAB_LABELS: Record<ProfileWindowTab, string> = {
  profile: 'Profile',
  'bets-history': 'Bets history',
};

export const TAB_LIST: ProfileWindowTab[] = ['profile', 'bets-history'];

export const SECTION_LABELS = {
  PROFILE: 'Profile',
  STATISTICS: 'Statistics',
  PREFERENCES: 'Preferences',
  CRYPTO_WALLETS: 'Crypto wallets',
} as const;

export const USERNAME_LABEL = 'Username';

export const USERNAME_HINT = "Used to login to site, can't be changed";

export const STAT_LABELS = {
  TOTAL_WAGERED: 'Total wagered',
  WAGER_POINTS_SPENT: 'Wager points spent',
} as const;

export const PRIVATE_MODE_LABEL = 'Private Mode';

export const PRIVATE_MODE_DESC =
  "Other users won't be able to view your wins, losses and wagered statistics";

export const CRYPTO_WALLETS = [
  { key: 'btcAddress' as const, label: 'BTC', placeholder: 'Enter address' },
  { key: 'ethAddress' as const, label: 'ETH', placeholder: 'Enter address' },
  { key: 'ltcAddress' as const, label: 'LTC', placeholder: 'Enter address' },
];

export const WALLET_EDIT_ARIA = 'Edit wallet address';

export const WALLET_SAVE_ARIA = 'Save wallet address';

export const WALLET_CANCEL_ARIA = 'Cancel editing';

export const DIALOG_TITLE = 'User Profile';

export const DIALOG_DESCRIPTION = 'Manage your profile settings and preferences';

export const STAT_CARD_IMAGE = {
  SRC: '/total-rewards/dollar-coins 1.png',
  ALT: '',
  WIDTH: 72,
  HEIGHT: 72,
} as const;

export const HISTORY_TITLE = 'Bets history';

export const SEARCH_PLACEHOLDER = 'Enter text';

export const SORT_LABEL = 'Sort by:';

export const SORT_DATE_LABEL = 'Date';

export const SORT_WIN_LABEL = 'Win';

export const SORT_DEFAULT: BetsSortKey = 'date';

export const SORT_OPTIONS: { value: BetsSortKey; label: string }[] = [
  { value: 'date', label: SORT_DATE_LABEL },
  { value: 'win', label: SORT_WIN_LABEL },
];

export const GAME_FILTER_ALL = 'all';

export const GAME_FILTERS = [
  { value: GAME_FILTER_ALL, label: 'All', iconName: 'winners' as const },
  { value: 'Roulette', label: 'Roulette', iconName: 'roulette' as const },
  { value: 'Keno', label: 'Keno', iconName: 'keno' as const },
  { value: 'Plinko', label: 'Plinko', iconName: 'plinko' as const },
  { value: 'Dice', label: 'Dice', iconName: 'dice' as const },
];

export const GAME_ICON_SRC: Partial<Record<'roulette' | 'keno' | 'plinko', string>> = {
  roulette: '/games-cards/roulette.webp',
  keno: '/games-cards/keno.webp',
  plinko: '/games-cards/plinko.webp',
};

export const BETS_TABLE_COLUMNS = {
  USER: 'User',
  GAME: 'Game',
  BET: 'Bet',
  MULTIPLIER: 'Multiplier',
  PRIZE: 'Prize',
  TIME: 'Time',
} as const;

export const BETS_PAGINATION_WINDOW = 2;
export const BETS_PAGINATION_EDGE = 1;
export const BETS_PAGINATION_THRESHOLD = 7;

export const PRIVATE_MODE_SWITCH_ID = 'private-mode-switch';

export const WALLET_DRAFT_DEFAULTS: Record<CryptoWalletKey, string> = {
  btcAddress: '',
  ethAddress: '',
  ltcAddress: '',
};

export const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

export const LABEL_COLOR: Record<CryptoWalletKey, string> = {
  btcAddress: 'text-crypto-btc',
  ethAddress: 'text-crypto-eth',
  ltcAddress: 'text-crypto-ltc',
};

export const HEAD_CLASS = 'h-11 px-4 py-3 text-xs text-muted-foreground font-normal';

export const CELL_CLASS = 'h-14 px-4 py-3 text-sm';

export const TAB_ICONS = {
  [PROFILE_WINDOW_TABS.PROFILE]: UserIcon,
  [PROFILE_WINDOW_TABS.BETS_HISTORY]: History,
} as const;
