'use client';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { GAME_PANEL_LABELS, GAME_PANEL_TAB, type GamePanelTab } from '@/shared/config';
import { BetAmountField } from './BetAmountField';

interface Props {
  activeTab: GamePanelTab;
  onTabChange: (tab: GamePanelTab) => void;
  betAmount?: string;
  balance: number;
  onBetAmountChange?: (value: string) => void;
  onBetBlur?: () => void;
  onBetHalf?: () => void;
  onBetDouble?: () => void;
  onBetMax?: () => void;
  actionButtonText: string;
  onAction: () => void;
  isActionDisabled?: boolean;
  betAmountFieldClassName?: string;
  actionButtonClassName?: string;
  hideBetAmountField?: boolean;
  children?: ReactNode;
}

const GAME_PANEL_TABS = [
  { value: GAME_PANEL_TAB.MANUAL, label: GAME_PANEL_LABELS.MANUAL },
  { value: GAME_PANEL_TAB.AUTO, label: GAME_PANEL_LABELS.AUTO },
];

export function GamePanel({
  activeTab,
  onTabChange,
  betAmount,
  balance,
  onBetAmountChange,
  onBetBlur,
  onBetHalf,
  onBetDouble,
  onBetMax,
  actionButtonText,
  onAction,
  isActionDisabled,
  betAmountFieldClassName,
  actionButtonClassName,
  hideBetAmountField,
  children,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-4 lg:gap-0 bg-bg-primary px-4 py-6 lg:w-[352px] lg:shrink-0 lg:p-6 overflow-y-auto max-h-full">
      <SegmentedTabs
        items={GAME_PANEL_TABS}
        value={activeTab}
        onValueChange={onTabChange}
        className="order-last lg:order-none"
      />

      {!hideBetAmountField &&
        betAmount !== undefined &&
        onBetAmountChange &&
        onBetHalf &&
        onBetDouble &&
        onBetMax && (
          <BetAmountField
            betAmount={betAmount}
            balance={balance}
            onBetAmountChange={onBetAmountChange}
            onBetBlur={onBetBlur}
            onBetHalf={onBetHalf}
            onBetDouble={onBetDouble}
            onBetMax={onBetMax}
            className={betAmountFieldClassName}
          />
        )}
      {children}

      <Button
        variant="main"
        size="play"
        onClick={onAction}
        disabled={isActionDisabled}
        className={cn('order-first lg:order-none', actionButtonClassName)}
      >
        {actionButtonText}
      </Button>
    </div>
  );
}
