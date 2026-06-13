'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { getBetsStory } from '../api/betStoryApi';
import type { Path } from './types';

export function useBetsStoryQuery(path: Path) {
  return useQuery({
    queryKey: QUERY_KEYS.betStory(path),
    queryFn: () => getBetsStory(path),
  });
}
