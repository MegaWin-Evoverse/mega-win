export const USER_QUERY_KEYS = {
  me: ['user', 'me'] as const,
};

export const ROULETTE_CONFIG_QUERY_KEYS = {
  config: ['roulette', 'config'] as const,
};

export const QUERY_KEYS = {
  betStory: (path: string) => ['bets-story', path],
  currentUser: ['current-user'],
  myBets: (params: { page: number }) => ['my-bets', params],
  leaderboard: (month: string) => ['leaderboard', month],
  fairnessSeed: ['fairness-seed'],
  rewards: (params: string) => ['rewards', params],
  seedHistory: (page: number) => ['seed-history', page],
  reward: (id: string) => ['reward', id],
} as const;

export const DAILY_CLAIM_QUERY_KEYS = {
  status: ['daily-claim', 'status'] as const,
};
