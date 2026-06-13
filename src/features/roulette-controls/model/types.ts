import type { BetType } from '../config/constants';

export interface PlacedBet {
  type: BetType;
  key: string;
  amount: number;
  label: string;
}

export interface BetResponse {
  betId: string;
  createdAt: string;
  betSize: string;
  payout: string;
  randomPosition: number;
  multiplier: number;
}

export interface BetResult {
  multiplier: number;
  payout: string;
  position: number;
}

export interface HistoryEntry {
  id: number;
  position: number;
}
