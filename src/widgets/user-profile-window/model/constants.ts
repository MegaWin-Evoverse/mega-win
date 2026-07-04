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

export const TAB_LIST = Object.values(PROFILE_WINDOW_TABS) as ProfileWindowTab[];

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

export const STAT_CARD_BACKGROUND = {
  WAGERED: '/total-rewards/wagered.webp',
  POINTS_SPENT: '/total-rewards/points.webp',
} as const;

export const HISTORY_TITLE = 'Bets history';

export const SEED_HISTORY_TITLE = 'Seed history';

export const SEED_HISTORY_EMPTY = 'No seed history found';

export const CONNECTIONS_TITLE = 'Connections';

export const CASINO_CONNECTIONS_SECTION_TITLE = 'Casino Connections';

export const CONNECTION_ICON_SRC = {
  discord: '/discord-icon.svg',
  kick: '/kick-icon.webp',
  google: '/google-icon.svg',
  steam: '/steam-icon.svg',
  degencity: '/degencity-icon.svg',
} as const;

export const CONNECTION_AUTH_INPUT_CLASS = 'border-auth-surface bg-auth-bg';

export const CONNECTION_STATUS_DISCONNECTED = 'Not connected';

export const CONNECTION_CONNECT_LABEL = 'Connect';

export const DEGENCITY_USERNAME_LABEL = 'My DegenCity Username';

export const DEGENCITY_USERNAME_PLACEHOLDER = 'Enter username';

export const DEGENCITY_APPLY_LABEL = 'Apply';

export const SOCIAL_CONNECTIONS = [
  {
    key: 'discord' as const,
    name: 'Discord',
    description: 'Connect Discord to unlock community features',
  },
  { key: 'kick' as const, name: 'Kick', description: 'Connect Kick to unlock community features' },
  {
    key: 'google' as const,
    name: 'Google',
    description: 'Connect Google to unlock account sign-in options',
  },
  {
    key: 'steam' as const,
    name: 'Steam',
    description: 'Connect Steam to unlock account sign-in options',
  },
] as const;

export const DEGENCITY_CONNECTION = {
  key: 'degencity' as const,
  name: 'DegenCity',
  description: 'Connect DegenCity, unlock community features',
} as const;

export const SEARCH_PLACEHOLDER = 'Enter text';

export const SORT_LABEL = 'Sort by:';

const SORT_DATE_LABEL = 'Date';

const SORT_WIN_LABEL = 'Win';

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

export const BETS_TABLE_COLUMNS = {
  USER: 'User',
  GAME: 'Game',
  BET: 'Bet',
  MULTIPLIER: 'Multiplier',
  PRIZE: 'Prize',
  TIME: 'Time',
} as const;

export const PAGE_OF_LABEL = 'of';

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

export const SEED_PAGE_SIZE = 10;

export const SEED_TRUNCATE_LENGTH = 20;

export const SEED_COPY_RESET_MS = 2000;

export const SEED_HISTORY_ENDPOINT = '/api/fairness/history';

export const SEED_HISTORY_FETCH_ERROR = 'Failed to fetch seed history';

export const SEED_TABLE_COLUMNS = {
  CLIENT_SEED: 'Client Seed',
  SERVER_SEED: 'Server Seed',
  NONCE: 'Nonce',
  DATE: 'Date',
} as const;

export const SEED_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
