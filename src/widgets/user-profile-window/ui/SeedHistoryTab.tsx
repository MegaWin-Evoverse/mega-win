'use client';
import { useSeedHistory } from '../model/useSeedHistory';
import { SEED_HISTORY_EMPTY, SEED_HISTORY_TITLE } from '../model/constants';
import { SeedHistoryTable } from './SeedHistoryTable';
import { SeedHistoryTableSkeleton } from './SeedHistoryTableSkeleton';
import { HistoryPagination } from './HistoryPagination';

export function SeedHistoryTab() {
  const { seeds, isSeedHistoryLoading, activePage, totalPages, paginationPages, onPageChange } =
    useSeedHistory();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">{SEED_HISTORY_TITLE}</h3>
      <div className="overflow-x-auto">
        {isSeedHistoryLoading ? (
          <SeedHistoryTableSkeleton />
        ) : seeds.length > 0 ? (
          <SeedHistoryTable seeds={seeds} />
        ) : (
          <div className="py-12 text-center text-sm text-muted-foreground">
            {SEED_HISTORY_EMPTY}
          </div>
        )}
      </div>
      {!isSeedHistoryLoading && (
        <HistoryPagination
          activePage={activePage}
          totalPages={totalPages}
          paginationPages={paginationPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
