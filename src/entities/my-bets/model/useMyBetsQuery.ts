'use client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { getMyBets } from '../api/myBetsApi';
import { MY_BETS_PAGE_SIZE } from './constants';
import type { MyBetsParams } from './types';

export function useMyBetsQuery(params: Omit<MyBetsParams, 'take'>) {
  return useQuery({
    queryKey: QUERY_KEYS.myBets(params),
    queryFn: () => getMyBets({ ...params, take: MY_BETS_PAGE_SIZE }),
  });
}
