import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from './getLeaderboard';
import { QUERY_KEYS } from './query-keys';

export function useLeaderboardQuery(month: string) {
  return useQuery({
    queryKey: QUERY_KEYS.leaderboard(month),
    queryFn: () => getLeaderboard({ month }),
  });
}
