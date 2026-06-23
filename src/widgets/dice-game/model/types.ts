export interface RollEntry {
  value: number;
  isWin: boolean;
}

export interface DiceBetPayload {
  betSize: string;
  threshold: number;
  above: boolean;
}

export interface DiceBetResponse {
  createdAt: string;
  betId: string;
  betSize: string;
  payout: string;
  multiplier: number;
  randomValue: number;
  threshold: number;
  above: boolean;
  didWin: boolean;
}
