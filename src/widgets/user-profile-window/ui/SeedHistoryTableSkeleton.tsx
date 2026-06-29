import { Skeleton } from '@/shared/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { CELL_CLASS, HEAD_CLASS, SEED_PAGE_SIZE, SEED_TABLE_COLUMNS } from '../model/constants';

export function SeedHistoryTableSkeleton() {
  return (
    <Table>
      <TableHeader className="[&_tr]:border-0">
        <TableRow className="border-0 hover:bg-transparent">
          <TableHead className={HEAD_CLASS}>{SEED_TABLE_COLUMNS.CLIENT_SEED}</TableHead>
          <TableHead className={HEAD_CLASS}>{SEED_TABLE_COLUMNS.SERVER_SEED}</TableHead>
          <TableHead className={HEAD_CLASS}>{SEED_TABLE_COLUMNS.NONCE}</TableHead>
          <TableHead className={HEAD_CLASS}>{SEED_TABLE_COLUMNS.DATE}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-0">
        {Array.from({ length: SEED_PAGE_SIZE }).map((_, i) => (
          <TableRow key={i} className="border-0 odd:bg-bg-primary">
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
      </TableBody>
    </Table>
  );
}
