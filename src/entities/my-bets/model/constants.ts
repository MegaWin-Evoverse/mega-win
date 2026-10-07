export const MY_BETS_PAGE_SIZE = 40;

export const MY_BETS_ENDPOINT = '/api/bets/my';

export const MY_BETS_BACKEND_PATH = '/bets/my';

export const BETS_SORT_API = {
  NEWEST: 'NEWEST',
  OLDEST: 'OLDEST',
  HIGHEST_PAYOUT: 'HIGHEST_PAYOUT',
  LOWEST_PAYOUT: 'LOWEST_PAYOUT',
} as const;

export const MY_BETS_QUERY_PARAM = {
  PAGE: 'page',
  TAKE: 'take',
  GAME_SLUG: 'gameSlug',
  SORT: 'sort',
} as const;
