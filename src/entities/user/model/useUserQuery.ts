'use client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { getUser } from '../api/userApi';

export function useUserQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.currentUser,
    queryFn: getUser,
    retry: false,
  });
}
