import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { DataTable, DATA_TABLE_ROW_CLASS } from '@/shared/ui/data-table';
import { TableCell, TableRow } from '@/shared/ui/table';
import { COIN_ICON } from '@/shared/config';
import { formatAmount } from '@/shared/lib/formatAmount';
import { formatMultiplier } from '../model/formatMultiplier';
import { BETS_TABLE_COLUMNS, CELL_CLASS, DATE_FORMAT, HEAD_CLASS } from '../model/constants';
import type { MyBet } from '@/entities/my-bets';
import type { User } from '@/entities/user';

interface Props {
  bets: MyBet[];
  user: User;
}

export function HistoryTable({ bets, user }: Props) {
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
      {bets.map((bet) => (
        <TableRow key={bet.id} className={DATA_TABLE_ROW_CLASS}>
          <TableCell className={CELL_CLASS}>
            <div className="flex items-center gap-2">
              <Avatar size="sm">
                <AvatarImage src={user.profileImgUrl} alt={user.username} />
                <AvatarFallback>{user.username[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{user.username}</span>
            </div>
          </TableCell>
          <TableCell className={CELL_CLASS}>{bet.gameName}</TableCell>
          <TableCell className={CELL_CLASS}>
            <div className="flex items-center gap-1.5">
              <Image src={COIN_ICON.SRC} alt="" width={14} height={14} aria-hidden />
              <span>${formatAmount(Number(bet.betSize))}</span>
            </div>
          </TableCell>
          <TableCell className={CELL_CLASS}>{formatMultiplier(bet.betSize, bet.payout)}</TableCell>
          <TableCell className={CELL_CLASS}>
            <div className="flex items-center gap-1.5">
              <Image src={COIN_ICON.SRC} alt="" width={14} height={14} aria-hidden />
              <span>${formatAmount(Number(bet.payout))}</span>
            </div>
          </TableCell>
          <TableCell className={CELL_CLASS}>
            {DATE_FORMAT.format(new Date(bet.settledAt))}
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  );
}
