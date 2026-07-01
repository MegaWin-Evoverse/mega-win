import { MY_BETS_PAGE_SIZE } from '@/entities/my-bets';
import { Skeleton } from '@/shared/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { BETS_TABLE_COLUMNS, CELL_CLASS, HEAD_CLASS } from '../model/constants';

export function HistoryTableSkeleton() {
  return (
    <Table>
      <TableHeader className="[&_tr]:border-0">
        <TableRow className="border-0 hover:bg-transparent">
          <TableHead className={HEAD_CLASS}>{BETS_TABLE_COLUMNS.USER}</TableHead>
          <TableHead className={HEAD_CLASS}>{BETS_TABLE_COLUMNS.GAME}</TableHead>
          <TableHead className={HEAD_CLASS}>{BETS_TABLE_COLUMNS.BET}</TableHead>
          <TableHead className={HEAD_CLASS}>{BETS_TABLE_COLUMNS.MULTIPLIER}</TableHead>
          <TableHead className={HEAD_CLASS}>{BETS_TABLE_COLUMNS.PRIZE}</TableHead>
          <TableHead className={HEAD_CLASS}>{BETS_TABLE_COLUMNS.TIME}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-0">
        {Array.from({ length: MY_BETS_PAGE_SIZE }).map((_, i) => (
          <TableRow key={i} className="border-0 odd:bg-bg-primary">
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
      </TableBody>
    </Table>
  );
}
