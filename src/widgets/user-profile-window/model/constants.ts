import type { BetsSortKey, CryptoWalletKey, ProfileWindowTab } from './types';
import { User as UserIcon, History, KeyRound, Link2 } from 'lucide-react';

export const PROFILE_WINDOW_TABS = {
  PROFILE: 'profile',
  BETS_HISTORY: 'bets-history',
  SEED_HISTORY: 'seed-history',
  CONNECTIONS: 'connections',
} as const;

export const TAB_LABELS: Record<ProfileWindowTab, string> = {
  profile: 'Profile',
  'bets-history': 'Bets history',
  'seed-history': 'Seed history',
  connections: 'Connections',
};

export const TAB_LIST: ProfileWindowTab[] = [
  'profile',
  'bets-history',
  'seed-history',
  'connections',
];

export const SECTION_LABELS = {
  PROFILE: 'Profile',
  STATISTICS: 'Statistics',
  PREFERENCES: 'Preferences',
  CRYPTO_WALLETS: 'Crypto wallets',
} as const;

export const USERNAME_LABEL = 'Username';

export const USERNAME_HINT = 'Your display name visible to other users';

export const USERNAME_EDIT_ARIA = 'Edit username';

export const WALLET_UPDATE_ERROR = 'Failed to update wallet address';

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

export const STAT_CARD_BACKGROUND = {
  WAGERED: '/total-rewards/wagered.webp',
  POINTS_SPENT: '/total-rewards/points.webp',
} as const;

export const HISTORY_TITLE = 'Bets history';

export const SEED_HISTORY_TITLE = 'Seed history';

export const SEED_HISTORY_EMPTY = 'No seed history found';

export const CONNECTIONS_TITLE = 'Connections';

export const CONNECTIONS_EMPTY = 'No connections found';

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

export const CRYPTO_ICONS: Record<CryptoWalletKey, string> = {
  btcAddress: '/crypto/btc.svg',
  ethAddress: '/crypto/eth.svg',
  ltcAddress: '/crypto/ltc.svg',
};

export const HEAD_CLASS = 'h-11 px-4 py-3 text-xs text-muted-foreground font-normal';

export const CELL_CLASS = 'h-14 px-4 py-3 text-sm';

export const TAB_ICONS = {
  [PROFILE_WINDOW_TABS.PROFILE]: UserIcon,
  [PROFILE_WINDOW_TABS.BETS_HISTORY]: History,
  [PROFILE_WINDOW_TABS.SEED_HISTORY]: KeyRound,
  [PROFILE_WINDOW_TABS.CONNECTIONS]: Link2,
} as const;
