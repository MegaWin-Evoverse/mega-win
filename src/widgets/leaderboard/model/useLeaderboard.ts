'use client';
import { useMemo, useState } from 'react';
import { useLeaderboardQuery, TOP_3_THRESHOLD } from '@/entities/leaderboard';
import { INITIAL_VISIBLE_ROWS, ROWS_PER_LOAD } from './constants';
import { getCompetitionEndDate } from './getCompetitionEndDate';

export function useLeaderboard() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ROWS);
  const { month, participants, top3, isLoading } = useLeaderboardQuery();

  const tableRows = participants.filter((p) => p.position > TOP_3_THRESHOLD);
  const visibleRows = tableRows.slice(0, visibleCount);
  const hasMore = visibleCount < tableRows.length;

  function loadMore() {
    setVisibleCount((prev) => prev + ROWS_PER_LOAD);
  }

  const endDate = useMemo(() => getCompetitionEndDate(month), [month]);

  return { top3, visibleRows, hasMore, loadMore, isLoading, endDate };
}
