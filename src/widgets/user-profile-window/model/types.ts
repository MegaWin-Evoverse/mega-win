import type { PROFILE_WINDOW_TABS } from './constants';

export type ProfileWindowTab = (typeof PROFILE_WINDOW_TABS)[keyof typeof PROFILE_WINDOW_TABS];

export type CryptoWalletKey = 'btcAddress' | 'ethAddress' | 'ltcAddress';

export type BetsSortKey = 'date' | 'win';

export type GameIconName = 'winners' | 'roulette' | 'keno' | 'plinko' | 'dice';
