import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { DataTable, DATA_TABLE_ROW_CLASS } from '@/shared/ui/data-table';
import { TableCell, TableRow } from '@/shared/ui/table';
import { GAME_POINT_ICON } from '@/shared/config';
import { COLUMN_HEADERS } from '../model/constants';
import type { Bet } from '../model/types';

const HEAD_CLASS = 'h-11 px-4 py-3 text-xs text-brand-text-light font-normal';
const CELL_CLASS = 'h-11 px-4 py-3 text-xs text-brand-text-white';

interface Props {
  bets: Bet[];
  className?: string;
}

export function BetsList({ bets, className }: Props) {
  return (
    <DataTable
      columns={[
        COLUMN_HEADERS.USER,
        COLUMN_HEADERS.GAME,
        COLUMN_HEADERS.BET,
        COLUMN_HEADERS.MULTIPLIER,
        COLUMN_HEADERS.PRIZE,
      ]}
      headClassName={HEAD_CLASS}
      className={className}
    >
      {bets.map((bet) => (
        <TableRow key={bet.betId} className={DATA_TABLE_ROW_CLASS}>
          <TableCell className={CELL_CLASS}>
            <div className="flex items-center gap-2">
              <Avatar size="sm">
                <AvatarFallback className="bg-brand-green-rewards text-brand-text-white">
                  {bet.username[0]}
                </AvatarFallback>
              </Avatar>
              <span>{bet.username}</span>
            </div>
          </TableCell>
          <TableCell className={CELL_CLASS}>{bet.gameName}</TableCell>
          <TableCell className={CELL_CLASS}>
            <div className="flex items-center gap-1.5">
              <Image src={GAME_POINT_ICON.SRC} width={16} height={16} alt="" aria-hidden />
              <span>${bet.betSize}</span>
            </div>
          </TableCell>
          <TableCell className={CELL_CLASS}>x{bet.multiplier}</TableCell>
          <TableCell className={CELL_CLASS}>
            <div className="flex items-center gap-1.5">
              <Image src={GAME_POINT_ICON.SRC} width={16} height={16} alt="" aria-hidden />
              <span>${bet.payout}</span>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  );
}
