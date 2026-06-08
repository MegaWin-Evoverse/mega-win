'use client';

import { type ReactNode } from 'react';

import { useGamePanel } from '../model/useGamePanel';
import { BetAmountField } from './BetAmountField';
import { BetButton } from './BetButton';
import { GameTabs } from './GameTabs';

interface Props {
  controls: ReactNode;
}

export function GamePanel({ controls }: Props) {
  const {
    activeTab,
    betAmount,
    balance,
    onTabChange,
    onBetAmountChange,
    onBetHalf,
    onBetDouble,
    onBetMax,
    onBet,
  } = useGamePanel();

  return (
    <div className="flex w-full flex-col gap-6 bg-bg-primary px-4 py-6 lg:w-[352px] lg:shrink-0 lg:gap-8 lg:p-6">
      <GameTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        className="order-last lg:order-none"
      />

      <div className="flex flex-col gap-4 lg:gap-6">
        <BetAmountField
          betAmount={betAmount}
          balance={balance}
          onBetAmountChange={onBetAmountChange}
          onBetHalf={onBetHalf}
          onBetDouble={onBetDouble}
          onBetMax={onBetMax}
        />
        {controls}
      </div>

      <BetButton onBet={onBet} className="order-first lg:order-none" />
    </div>
  );
}
