import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { COLUMN_HEADERS } from '../model/constants';
import type { Bet } from '../model/types';

const HEAD_CLASS = 'h-11 px-4 py-3 text-xs text-brand-text-light font-normal';
const CELL_CLASS = 'h-11 px-4 py-3 text-xs text-brand-text-white';

interface Props {
  bets: Bet[];
}

export function BetsList({ bets }: Props) {
  return (
    <Table>
      <TableHeader className="[&_tr]:border-0">
        <TableRow className="border-0 hover:bg-transparent">
          <TableHead className={HEAD_CLASS}>{COLUMN_HEADERS.USER}</TableHead>
          <TableHead className={HEAD_CLASS}>{COLUMN_HEADERS.GAME}</TableHead>
          <TableHead className={HEAD_CLASS}>{COLUMN_HEADERS.BET}</TableHead>
          <TableHead className={HEAD_CLASS}>{COLUMN_HEADERS.MULTIPLIER}</TableHead>
          <TableHead className={HEAD_CLASS}>{COLUMN_HEADERS.PRIZE}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="[&_tr:last-child]:border-0">
        {bets.map((bet) => (
          <TableRow key={bet.betId} className="border-0 odd:bg-bg-primary">
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
                <Image src="/icons/green-coin.svg" width={16} height={16} alt="" aria-hidden />
                <span>${bet.betSize}</span>
              </div>
            </TableCell>

            <TableCell className={CELL_CLASS}>x{bet.multiplier}</TableCell>

            <TableCell className={CELL_CLASS}>
              <div className="flex items-center gap-1.5">
                <Image src="/icons/green-coin.svg" width={16} height={16} alt="" aria-hidden />
                <span>${bet.payout}</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
