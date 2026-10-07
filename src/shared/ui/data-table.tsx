import type { ReactNode } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

export const DATA_TABLE_ROW_CLASS = 'border-0 odd:bg-bg-primary';

interface Props {
  columns: readonly string[];
  headClassName: string;
  className?: string;
  children: ReactNode;
}

export function DataTable({ columns, headClassName, className, children }: Props) {
  return (
    <Table className={className}>
      <TableHeader className="[&_tr]:border-0">
        <TableRow className="border-0 hover:bg-transparent">
          {columns.map((column) => (
            <TableHead key={column} className={headClassName}>
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-0">{children}</TableBody>
    </Table>
  );
}
