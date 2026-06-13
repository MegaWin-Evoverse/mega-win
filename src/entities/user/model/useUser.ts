import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { USER_QUERY_KEYS } from '@/shared/api/query-keys';
import type { UserProfile } from './types';

const GAME_POINTS_BALANCE_TYPE = 'GAME_POINTS' as const;
const DEFAULT_BALANCE = 0;
const ME_PATH = '/user/query/me';

async function fetchMe(): Promise<UserProfile> {
  const response = await api.get<UserProfile>(ME_PATH);
  return response.data;
}

export function useUser() {
  const {
    data,
    isLoading: isFetchingUser,
    isError: isUserFetchError,
  } = useQuery({
    queryKey: USER_QUERY_KEYS.me,
    queryFn: fetchMe,
    retry: false,
  });

  const gamePointsBalanceEntry = data?.userBalances.find(
    (b) => b.balanceType === GAME_POINTS_BALANCE_TYPE
  );
  const gamePointsBalance = gamePointsBalanceEntry
    ? parseFloat(gamePointsBalanceEntry.value)
    : DEFAULT_BALANCE;

  return {
    user: data ?? null,
    gamePointsBalance,
    isFetchingUser,
    isUserFetchError,
  };
}
