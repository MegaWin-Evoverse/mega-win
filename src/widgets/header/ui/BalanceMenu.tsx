'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Info, RefreshCw } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { COIN_ICON, GAME_POINT_ICON } from '@/shared/config';
import { BALANCE_TYPE, type UserBalance } from '@/entities/user';
import { AnimatedNumber } from '@/shared/ui/AnimatedNumber';
import {
  BALANCE_HEADER,
  EXCHANGE_LABEL,
  GAME_POINTS_LABEL,
  WATCH_POINTS_LABEL,
} from '../model/constants';

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
      <DropdownMenuTrigger className="flex h-10 min-w-0 items-center gap-3 rounded-sm bg-header-balance-bg px-3 py-2 outline-none cursor-pointer">
        <Image
          src={GAME_POINT_ICON.SRC}
          alt=""
          aria-hidden
          width={20}
          height={20}
          className="header-balance-coin-shadow size-5 shrink-0"
        />
        <AnimatedNumber
          value={Number(gamePoints)}
          className="truncate text-base font-normal leading-5 text-brand-text-white"
        />
        <Separator orientation="vertical" className="h-5 shrink-0" />
        <Image
          src={COIN_ICON.SRC}
          alt=""
          aria-hidden
          width={20}
          height={20}
          className="header-balance-coin-shadow size-5 shrink-0"
        />
        <AnimatedNumber
          value={Number(watchPoints)}
          className="truncate text-base font-normal leading-5 text-brand-text-white"
        />
        {isOpen ? (
          <ChevronUp className="size-4 shrink-0" />
        ) : (
          <ChevronDown className="size-4 shrink-0" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72 p-4">
        <p className="mb-3 text-sm font-semibold">{BALANCE_HEADER}</p>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between rounded-lg bg-auth-surface p-3">
            <div className="flex items-center gap-2">
              <Image
                src={GAME_POINT_ICON.SRC}
                alt=""
                aria-hidden
                width={16}
                height={16}
                className="size-4"
              />
              <span className="text-sm">{GAME_POINTS_LABEL}</span>
              <Info className="size-3 text-muted-foreground" />
            </div>
            <AnimatedNumber value={Number(gamePoints)} className="text-sm font-medium" />
          </div>
          <div className="flex items-center justify-between rounded-lg bg-auth-surface p-3">
            <div className="flex items-center gap-2">
              <Image
                src={COIN_ICON.SRC}
                alt=""
                aria-hidden
                width={16}
                height={16}
                className="size-4"
              />
              <span className="text-sm">{WATCH_POINTS_LABEL}</span>
              <Info className="size-3 text-muted-foreground" />
            </div>
            <AnimatedNumber value={Number(watchPoints)} className="text-sm font-medium" />
          </div>
        </div>

        <Button variant="outline" className="group mt-3 h-auto w-full py-4">
          <span className="flex items-center gap-2 transition-all duration-500 ease-out group-hover:translate-x-2">
            <RefreshCw className="size-4" />
            {EXCHANGE_LABEL}
          </span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
