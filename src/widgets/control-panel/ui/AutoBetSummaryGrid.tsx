import { CONTROL_PANEL_LABELS } from '../model/constants';
import { SummaryCard } from './SummaryCard';

interface Props {
  onWinMode: string;
  onLossMode: string;
  stopOnProfit: string;
  stopOnLoss: string;
}

export function AutoBetSummaryGrid({ onWinMode, onLossMode, stopOnProfit, stopOnLoss }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <SummaryCard label={CONTROL_PANEL_LABELS.ON_WIN} value={onWinMode} />
      <SummaryCard label={CONTROL_PANEL_LABELS.ON_LOSS} value={onLossMode} />
      <SummaryCard label={CONTROL_PANEL_LABELS.STOP_ON_PROFIT} value={stopOnProfit} withCoin />
      <SummaryCard label={CONTROL_PANEL_LABELS.STOP_ON_LOSS} value={stopOnLoss} withCoin />
    </div>
  );
}
