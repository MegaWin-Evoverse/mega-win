'use client';
import { useState, useMemo } from 'react';
import { useMyBetsQuery } from '@/entities/my-bets';
import { SORT_DEFAULT, GAME_FILTER_ALL } from './constants';
import { buildPaginationPages } from './buildPaginationPages';
import type { BetsSortKey } from './types';

export function useBetsHistory() {
  const [activePage, setActivePage] = useState(1);
  const [activeGame, setActiveGame] = useState(GAME_FILTER_ALL);
  const [activeSort, setActiveSort] = useState<BetsSortKey>(SORT_DEFAULT);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: bets, isLoading: isBetsLoading } = useMyBetsQuery({ page: activePage });

  const filteredBets = useMemo(() => {
    const all = bets?.data ?? [];
    const query = searchQuery.toLowerCase();

    const filtered = all.filter((b) => {
      if (activeGame !== GAME_FILTER_ALL && b.gameName !== activeGame) return false;
      if (query && !b.gameName.toLowerCase().includes(query) && !b.betSize.includes(query))
        return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (activeSort === 'win') {
        return parseFloat(b.payout) - parseFloat(a.payout);
      }

      return new Date(b.settledAt).getTime() - new Date(a.settledAt).getTime();
    });
  }, [bets, activeGame, activeSort, searchQuery]);

  const totalPages = bets?.totalPages ?? 1;

  const paginationPages = buildPaginationPages(activePage, totalPages);

  function onPageChange(page: number) {
    setActivePage(page);
  }

  function onGameChange(game: string) {
    setActiveGame(game);
    setActivePage(1);
  }

  function onSortChange(sort: BetsSortKey) {
    setActiveSort(sort);
    setActivePage(1);
  }

  function onSearchChange(query: string) {
    setSearchQuery(query);
  }

  return {
    filteredBets,
    isBetsLoading,
    activePage,
    totalPages,
    activeGame,
    activeSort,
    searchQuery,
    onPageChange,
    onGameChange,
    onSortChange,
    onSearchChange,
    paginationPages,
  };
}
