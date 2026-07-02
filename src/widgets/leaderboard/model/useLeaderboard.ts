'use client';
import { useMemo, useState } from 'react';
import { useLeaderboardQuery } from '@/shared/api/useLeaderboardQuery';
import { INITIAL_VISIBLE_ROWS, ROWS_PER_LOAD, TOP_3_THRESHOLD } from './constants';
import { getCurrentMonth } from '@/shared/lib/getCurrentMonth';
import { getCompetitionEndDate } from './getCompetitionEndDate';

export function useLeaderboard() {
  const month = getCurrentMonth();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ROWS);

  const { data, isLoading } = useLeaderboardQuery(month);

  const allParticipants = data?.participants?.data ?? [];
  const top3 = allParticipants.filter((p) => Number(p.position) <= TOP_3_THRESHOLD);
  const tableRows = allParticipants.filter((p) => Number(p.position) > TOP_3_THRESHOLD);
  const visibleRows = tableRows.slice(0, visibleCount);
  const hasMore = visibleCount < tableRows.length;

  function loadMore() {
    setVisibleCount((prev) => prev + ROWS_PER_LOAD);
  }

  const endDate = useMemo(() => getCompetitionEndDate(month), [month]);

  return { top3, visibleRows, hasMore, loadMore, isLoading, endDate };
}
