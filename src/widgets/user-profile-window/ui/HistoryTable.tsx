import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
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
        {bets.map((bet) => (
          <TableRow key={bet.id} className="border-0 odd:bg-bg-primary">
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

            <TableCell className={CELL_CLASS}>
              {formatMultiplier(bet.betSize, bet.payout)}
            </TableCell>

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
      </TableBody>
    </Table>
  );
}
