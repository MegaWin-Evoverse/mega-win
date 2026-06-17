export const QUERY_KEYS = {
  betStory: (path: string) => ['bets-story', path],
  currentUser: ['current-user'],
  leaderboard: (month: string) => ['leaderboard', month],
} as const;
