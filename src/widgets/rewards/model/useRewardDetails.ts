'use client';
import { useRewardQuery } from './useRewardQuery';

export function useRewardDetails(id: string) {
  const { data: reward, isLoading, isError } = useRewardQuery(id);

  return { reward, isLoading, isError };
}
