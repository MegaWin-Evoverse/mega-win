export type Path = 'latest' | 'high-rollers' | 'lucky' | 'my';

export interface Bet {
  id: string;
  game: string;
  bet: number;
  prize: number;
  betId: string;
  betSettledAt: string;
  betSize: string;
  payout: string;
  multiplier: string;
  userId: string;
  username: string;
  gameName: string;
  gameImage: null;
  gameSlug: string;
}
