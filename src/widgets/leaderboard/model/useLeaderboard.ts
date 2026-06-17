'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { getLeaderboard } from '../api/getLeaderboard';
import { INITIAL_VISIBLE_ROWS, ROWS_PER_LOAD, TOP_3_THRESHOLD } from './constants';
import { getCurrentMonth } from './getCurrentMonth';
import { getCompetitionEndDate } from './getCompetitionEndDate';

export function useLeaderboard() {
  const month = getCurrentMonth();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ROWS);

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.leaderboard(month),
    queryFn: () => getLeaderboard({ month }),
  });

  const allParticipants = data?.participants.data ?? [];
  const top3 = allParticipants.filter((p) => p.position <= TOP_3_THRESHOLD);
  const tableRows = allParticipants.filter((p) => p.position > TOP_3_THRESHOLD);
  const visibleRows = tableRows.slice(0, visibleCount);
  const hasMore = visibleCount < tableRows.length;

  function loadMore() {
    setVisibleCount((prev) => prev + ROWS_PER_LOAD);
  }

  return { top3, visibleRows, hasMore, loadMore, isLoading, endDate: getCompetitionEndDate(month) };
}
