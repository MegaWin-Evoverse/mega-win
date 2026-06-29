'use client';
import { useState } from 'react';
import { buildPaginationPages } from './buildPaginationPages';
import { useSeedHistoryQuery } from './useSeedHistoryQuery';

export function useSeedHistory() {
  const [activePage, setActivePage] = useState(1);
  const { data, isLoading: isSeedHistoryLoading } = useSeedHistoryQuery(activePage);
  const totalPages = data?.totalPages ?? 1;
  const paginationPages = buildPaginationPages(activePage, totalPages);

  function onPageChange(page: number) {
    setActivePage(page);
  }

  return {
    seeds: data?.data ?? [],
    isSeedHistoryLoading,
    activePage,
    totalPages,
    paginationPages,
    onPageChange,
  };
}
