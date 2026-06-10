export type Path = 'latest' | 'high-rollers' | 'lucky' | 'my';

export interface Bet {
  betId: string;
  betSize: string;
  payout: string;
  multiplier: string;
  username: string;
  gameName: string;
}
