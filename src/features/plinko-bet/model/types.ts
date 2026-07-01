import type { ApiRisk, MultiplierTier, Risk } from '@/entities/game';

export interface PlinkoBetPayload {
  betSize: number;
  rowsCount: number;
  risk: ApiRisk;
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

export interface PlinkoResult {
  multiplier: number;
  payout: number;
}

export interface PlacePlinkoBetArgs {
  betSize: number;
  rows: number;
  risk: Risk;
}
