'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Coins, Info, RefreshCw } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { BALANCE_TYPE, type UserBalance } from '@/entities/user';
import {
  BALANCE_HEADER,
  EXCHANGE_LABEL,
  GAME_POINTS_LABEL,
  WATCH_POINTS_LABEL,
} from '../model/constants';
import { formatBalance } from '../model/formatBalance';

interface Props {
  balances: UserBalance[];
}

export function BalanceMenu({ balances }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const gamePoints =
    balances.find((balance) => balance.balanceType === BALANCE_TYPE.GAME_POINTS)?.value ?? '0';
  const watchPoints =
    balances.find((balance) => balance.balanceType === BALANCE_TYPE.WATCH_POINTS)?.value ?? '0';

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-bg px-3 py-2 text-sm outline-none cursor-pointer">
        <Coins className="size-4 text-coin-game" />
        <span className="font-medium">{formatBalance(gamePoints)}</span>
        <Separator orientation="vertical" className="h-4" />
        <Coins className="size-4 text-coin-watch" />
        <span className="font-medium">{formatBalance(watchPoints)}</span>
        {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72 p-4">
        <p className="mb-3 text-sm font-semibold">{BALANCE_HEADER}</p>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <Coins className="size-4 text-coin-game" />
              <span className="text-sm">{GAME_POINTS_LABEL}</span>
              <Info className="size-3 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium">{formatBalance(gamePoints)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <Coins className="size-4 text-coin-watch" />
              <span className="text-sm">{WATCH_POINTS_LABEL}</span>
              <Info className="size-3 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium">{formatBalance(watchPoints)}</span>
          </div>
        </div>

        <Button variant="outline" className="mt-3 w-full gap-2">
          <RefreshCw className="size-4" />
          {EXCHANGE_LABEL}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
