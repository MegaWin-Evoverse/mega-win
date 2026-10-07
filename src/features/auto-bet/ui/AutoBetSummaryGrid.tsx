'use client';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { AUTO_BET_LABELS } from '../model/constants';
import { useAutoBetSummary } from '../model/useAutoBetSummary';
import { SummaryCard } from './SummaryCard';

interface Props {
  className?: string;
}

export function AutoBetSummaryGrid({ className }: Props) {
  const { onWinMode, onLossMode, stopOnProfit, stopOnLoss, isAutoMode } = useAutoBetSummary();

  return (
    <CollapsibleSection isOpen={isAutoMode} className={className} openClassName="lg:mt-4">
      <div className="grid grid-cols-2 gap-2">
        <SummaryCard label={AUTO_BET_LABELS.ON_WIN} value={onWinMode} />
        <SummaryCard label={AUTO_BET_LABELS.ON_LOSS} value={onLossMode} />
        <SummaryCard label={AUTO_BET_LABELS.STOP_ON_PROFIT} value={stopOnProfit} withCoin />
        <SummaryCard label={AUTO_BET_LABELS.STOP_ON_LOSS} value={stopOnLoss} withCoin />
      </div>
    </CollapsibleSection>
  );
}
