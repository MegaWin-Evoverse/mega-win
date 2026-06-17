export const QUERY_KEYS = {
  betStory: (path: string) => ['bets-story', path],
  currentUser: ['current-user'],
  rewards: (params: string) => ['rewards', params],
} as const;
