import Image from 'next/image';
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { formatAmount } from '@/shared/lib/formatAmount';
import { COIN_ICON } from '@/shared/config';
import {
  DEFAULT_AVATAR_SRC,
  INITIAL_VISIBLE_ROWS,
  LEADERBOARD_LABELS,
  LEADERBOARD_SIZES,
} from '../model/constants';
import type { LeaderboardParticipant } from '../model/types';

interface Props {
  rows: LeaderboardParticipant[];
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
}

export function Table({ rows, hasMore, onLoadMore, isLoading }: Props) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full overflow-x-auto">
        <TableComponent>
          <TableHeader>
            <TableRow className="border-brand-border/10">
              <TableHead className="text-brand-text-light font-outfit font-normal text-xs sm:text-sm w-12 sm:w-20">
                {LEADERBOARD_LABELS.COL_RANK}
              </TableHead>
              <TableHead className="text-brand-text-light font-outfit font-normal text-xs sm:text-sm">
                {LEADERBOARD_LABELS.COL_USERNAME}
              </TableHead>
              <TableHead className="text-brand-text-light font-outfit font-normal text-xs sm:text-sm">
                {LEADERBOARD_LABELS.COL_WAGERED}
              </TableHead>
              <TableHead className="text-brand-text-light font-outfit font-normal text-xs sm:text-sm text-right">
                {LEADERBOARD_LABELS.COL_PRIZE}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: INITIAL_VISIBLE_ROWS }).map((_, i) => (
                  <TableRow key={i} className="border-brand-border/10">
                    <TableCell>
                      <Skeleton className="h-4 w-6" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              : rows.map((row) => (
                  <TableRow key={row.username} className="border-brand-border/10">
                    <TableCell className="font-outfit text-brand-text-light text-xs sm:text-sm">
                      {row.position}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Image
                          src={DEFAULT_AVATAR_SRC}
                          alt={row.username}
                          width={LEADERBOARD_SIZES.TABLE_AVATAR}
                          height={LEADERBOARD_SIZES.TABLE_AVATAR}
                          className="rounded-full shrink-0"
                        />
                        <span className="font-outfit text-brand-text-white text-xs sm:text-sm">
                          {row.username}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <Image
                          src={COIN_ICON.SRC}
                          alt={COIN_ICON.ALT}
                          width={LEADERBOARD_SIZES.COIN_ICON}
                          height={LEADERBOARD_SIZES.COIN_ICON}
                        />
                        <span className="font-outfit text-brand-text-white text-xs sm:text-sm">
                          ${formatAmount(Number(row.usdWager))}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {row.prizeValue ? (
                        <div className="flex items-center justify-end gap-1 sm:gap-1.5">
                          <Image
                            src={COIN_ICON.SRC}
                            alt={COIN_ICON.ALT}
                            width={LEADERBOARD_SIZES.COIN_ICON}
                            height={LEADERBOARD_SIZES.COIN_ICON}
                          />
                          <span className="font-outfit text-brand-text-white text-xs sm:text-sm">
                            ${formatAmount(Number(row.prizeValue))}
                          </span>
                        </div>
                      ) : (
                        <span className="text-brand-text-light text-xs sm:text-sm">
                          {LEADERBOARD_LABELS.NO_PRIZE}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </TableComponent>
      </div>
      {hasMore && (
        <Button variant="neutral" size="none" onClick={onLoadMore}>
          {LEADERBOARD_LABELS.SHOW_MORE_BUTTON}
        </Button>
      )}
    </div>
  );
}
