import type { PROFILE_WINDOW_TABS } from './constants';

export type ProfileWindowTab = (typeof PROFILE_WINDOW_TABS)[keyof typeof PROFILE_WINDOW_TABS];

export type CryptoWalletKey = 'btcAddress' | 'ethAddress' | 'ltcAddress';

export type BetsSortKey = 'date' | 'win';

export type GameIconName = 'winners' | 'roulette' | 'keno' | 'plinko' | 'dice';

export interface SeedHistoryItem {
  id: string;
  createdAt: string;
  serverSeed: string;
  hashedServerSeed: string;
  clientSeed: string;
  nonce: number;
  userId: string;
}

export interface SeedHistoryResponse {
  take: number;
  page: number;
  total: number;
  totalPages: number;
  data: SeedHistoryItem[];
}
