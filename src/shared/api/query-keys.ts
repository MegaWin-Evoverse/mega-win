export const QUERY_KEYS = {
  betStory: (path: string) => ['bets-story', path],
  currentUser: ['current-user'],
  myBets: (params: { page: number }) => ['my-bets', params],
} as const;
