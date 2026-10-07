import type { BETS_SORT_API } from './constants';

export type BetsSortApiValue = (typeof BETS_SORT_API)[keyof typeof BETS_SORT_API];

export interface MyBet {
  id: string;
  betSize: string;
  payout: string;
  settledAt: string;
  gameName: string;
  providerName: string;
}

export interface MyBetsResponse {
  take: number;
  page: number;
  total: number;
  totalPages: number;
  data: MyBet[];
}

export interface MyBetsParams {
  page: number;
  take: number;
  gameSlug?: string;
  sort?: BetsSortApiValue;
}
