import { type MultiplierTier, type Risk } from '@/entities/game';

export interface PlinkoBetPayload {
  betSize: number;
  rowsCount: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface PlinkoBetResult {
  betId: string;
  betSize: string;
  payout: string;
  multiplier: number;
  results: number[];
  createdAt: string;
}

export interface PlinkoDrop {
  id: string;
  results: number[];
  multiplier: number;
  payout: number;
  tier: MultiplierTier;
}

export interface PlinkoHistoryEntry {
  id: string;
  multiplier: number;
  tier: MultiplierTier;
}

export interface PlacePlinkoBetArgs {
  betSize: number;
  rows: number;
  risk: Risk;
}
