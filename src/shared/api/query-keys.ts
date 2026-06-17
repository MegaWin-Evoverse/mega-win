export const QUERY_KEYS = {
  betStory: (path: string) => ['bets-story', path],
  currentUser: ['current-user'],
  fairnessSeed: ['fairness-seed'],
} as const;
