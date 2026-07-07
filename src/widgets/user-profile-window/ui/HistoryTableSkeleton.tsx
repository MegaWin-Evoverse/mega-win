import { MY_BETS_PAGE_SIZE } from '@/entities/my-bets';
import { DataTable, DATA_TABLE_ROW_CLASS } from '@/shared/ui/data-table';
import { Skeleton } from '@/shared/ui/skeleton';
import { TableCell, TableRow } from '@/shared/ui/table';
import { BETS_TABLE_COLUMNS, CELL_CLASS, HEAD_CLASS } from '../model/constants';

export function HistoryTableSkeleton() {
  return (
    <DataTable
      columns={[
        BETS_TABLE_COLUMNS.USER,
        BETS_TABLE_COLUMNS.GAME,
        BETS_TABLE_COLUMNS.BET,
        BETS_TABLE_COLUMNS.MULTIPLIER,
        BETS_TABLE_COLUMNS.PRIZE,
        BETS_TABLE_COLUMNS.TIME,
      ]}
      headClassName={HEAD_CLASS}
    >
      {Array.from({ length: MY_BETS_PAGE_SIZE }).map((_, i) => (
        <TableRow key={i} className={DATA_TABLE_ROW_CLASS}>
          <TableCell className={CELL_CLASS}>
            <div className="flex items-center gap-2">
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          </TableCell>
          <TableCell className={CELL_CLASS}>
            <Skeleton className="h-3.5 w-16" />
          </TableCell>
          <TableCell className={CELL_CLASS}>
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-3.5 rounded-full" />
              <Skeleton className="h-3.5 w-14" />
            </div>
          </TableCell>
          <TableCell className={CELL_CLASS}>
            <Skeleton className="h-3.5 w-12" />
          </TableCell>
          <TableCell className={CELL_CLASS}>
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-3.5 rounded-full" />
              <Skeleton className="h-3.5 w-14" />
            </div>
          </TableCell>
          <TableCell className={CELL_CLASS}>
            <Skeleton className="h-3.5 w-28" />
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  );
}
