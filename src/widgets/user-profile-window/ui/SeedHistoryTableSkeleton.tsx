import { DataTable, DATA_TABLE_ROW_CLASS } from '@/shared/ui/data-table';
import { Skeleton } from '@/shared/ui/skeleton';
import { TableCell, TableRow } from '@/shared/ui/table';
import { CELL_CLASS, HEAD_CLASS, SEED_PAGE_SIZE, SEED_TABLE_COLUMNS } from '../model/constants';

export function SeedHistoryTableSkeleton() {
  return (
    <DataTable
      columns={[
        SEED_TABLE_COLUMNS.CLIENT_SEED,
        SEED_TABLE_COLUMNS.SERVER_SEED,
        SEED_TABLE_COLUMNS.NONCE,
        SEED_TABLE_COLUMNS.DATE,
      ]}
      headClassName={HEAD_CLASS}
    >
      {Array.from({ length: SEED_PAGE_SIZE }).map((_, i) => (
        <TableRow key={i} className={DATA_TABLE_ROW_CLASS}>
          <TableCell className={CELL_CLASS}>
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3.5 w-48" />
              <Skeleton className="size-3.5" />
            </div>
          </TableCell>
          <TableCell className={CELL_CLASS}>
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3.5 w-48" />
              <Skeleton className="size-3.5" />
            </div>
          </TableCell>
          <TableCell className={CELL_CLASS}>
            <Skeleton className="h-3.5 w-8" />
          </TableCell>
          <TableCell className={CELL_CLASS}>
            <Skeleton className="h-3.5 w-24" />
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  );
}
