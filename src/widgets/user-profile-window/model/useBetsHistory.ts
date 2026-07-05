'use client';
import { useState, useMemo } from 'react';
import { useMyBetsQuery } from '@/entities/my-bets';
import { SORT_DEFAULT, SORT_API_MAP, GAME_FILTER_ALL, GAME_FILTER_SLUGS } from './constants';
import { buildPaginationPages } from './buildPaginationPages';
import type { BetsSortKey } from './types';

export function useBetsHistory() {
  const [activePage, setActivePage] = useState(1);
  const [activeGame, setActiveGame] = useState(GAME_FILTER_ALL);
  const [activeSort, setActiveSort] = useState<BetsSortKey>(SORT_DEFAULT);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: bets, isLoading: isBetsLoading } = useMyBetsQuery({
    page: activePage,
    gameSlug: GAME_FILTER_SLUGS[activeGame],
    sort: SORT_API_MAP[activeSort],
  });

  const filteredBets = useMemo(() => {
    const all = bets?.data ?? [];
    const query = searchQuery.toLowerCase();

    return all.filter((b) => {
      if (query && !b.gameName.toLowerCase().includes(query) && !b.betSize.includes(query))
        return false;
      return true;
    });
  }, [bets, searchQuery]);

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
