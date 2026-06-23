export type GamePhase = 'default' | 'pick' | 'win' | 'lose';

export type CellState = 'idle' | 'selected' | 'hit' | 'miss' | 'drawn';

export type GameResult = 'idle' | 'win' | 'lose';

export interface KenoBetPayload {
  betSize: string;
  risk: string;
  selected: number[];
}

export interface KenoBetResponse {
  createdAt: string;
  betId: string;
  betSize: string;
  payout: string;
  multiplier: number;
  results: number[];
}
