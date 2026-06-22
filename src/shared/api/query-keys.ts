export const USER_QUERY_KEYS = {
  me: ['user', 'me'] as const,
};

export const ROULETTE_CONFIG_QUERY_KEYS = {
  config: ['roulette', 'config'] as const,
};

export const QUERY_KEYS = {
  betStory: (path: string) => ['bets-story', path],
  currentUser: ['current-user'],
  rewards: (params: string) => ['rewards', params],
} as const;
