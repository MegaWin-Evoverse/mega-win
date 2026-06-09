import { DICE_LABELS } from '@/features/dice-controls';
import { SummaryCard } from '@/features/game-panel';

interface Props {
  onWinMode: string;
  onLossMode: string;
  stopOnProfit: string;
  stopOnLoss: string;
}

export function AutoBetSummaryGrid({ onWinMode, onLossMode, stopOnProfit, stopOnLoss }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <SummaryCard label={DICE_LABELS.ON_WIN} value={onWinMode} />
      <SummaryCard label={DICE_LABELS.ON_LOSS} value={onLossMode} />
      <SummaryCard label={DICE_LABELS.STOP_ON_PROFIT} value={stopOnProfit} withCoin />
      <SummaryCard label={DICE_LABELS.STOP_ON_LOSS} value={stopOnLoss} withCoin />
    </div>
  );
}
