'use client';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Input } from '@/shared/ui/input';
import { useBetsHistory } from '../model/useBetsHistory';
import { HISTORY_TITLE, SEARCH_PLACEHOLDER, SORT_LABEL, SORT_OPTIONS } from '../model/constants';
import { HistoryFilter } from './HistoryFilter';
import { HistoryTable } from './HistoryTable';
import { HistoryPagination } from './HistoryPagination';
import type { User } from '@/entities/user';

interface Props {
  user: User;
}

export function HistoryTab({ user }: Props) {
  const {
    filteredBets,
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
  } = useBetsHistory();

  const activeSortLabel = SORT_OPTIONS.find((option) => option.value === activeSort)?.label;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">{HISTORY_TITLE}</h3>

      <HistoryFilter activeGame={activeGame} onGameChange={onGameChange} />

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            className="pl-9"
            placeholder={SEARCH_PLACEHOLDER}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="group flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-bg-primary px-3 py-2 text-sm outline-none">
            <span className="text-muted-foreground">{SORT_LABEL}</span>
            <span className="font-medium text-primary">{activeSortLabel}</span>
            <ChevronDown className="size-4 transition-transform group-data-[popup-open]:rotate-180" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={cn(activeSort !== option.value && 'text-muted-foreground')}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto">
        {filteredBets.length > 0 ? (
          <HistoryTable bets={filteredBets} user={user} />
        ) : (
          <div className="py-12 text-center text-sm text-muted-foreground">No bets found</div>
        )}
      </div>

      <HistoryPagination
        activePage={activePage}
        totalPages={totalPages}
        paginationPages={paginationPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
