import type { Game } from '@/entities/game';
import { cn } from '@/shared/lib/cn';
import { ManualAutoTabs } from '@/features/game-mode-tabs';
import { BetAmountField, ProfitOnWinField } from '@/features/bet-amount';
import { RiskSelector } from '@/features/risk-selector';
import { RowsSlider } from '@/features/rows-slider';
import { NumberOfBetsField, AutoBetSummaryGrid, ConfigureButton } from '@/features/auto-bet';
import { ChipValueSummary, ChipsGrid } from '@/features/chip-selector';
import { TableActions } from '@/features/table-actions';
import { BetButton } from '@/features/bet-button';
import { CONTROL_PANEL_CONFIG } from '../model/constants';

interface Props {
  game: Game;
  className?: string;
  onBet?: () => void;
  isBetting?: boolean;
  placedBet?: number;
  isAutoRunning?: boolean;
  autoRunningLabel?: string;
  onClearTable?: () => void;
  onUndo?: () => void;
  onAutoPick?: () => void;
}

export function ControlPanel({
  game,
  className,
  onBet,
  isBetting,
  placedBet,
  isAutoRunning,
  autoRunningLabel,
  onClearTable,
  onUndo,
  onAutoPick,
}: Props) {
  const config = CONTROL_PANEL_CONFIG[game];

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-4 lg:gap-0 bg-bg-primary px-4 py-6 lg:w-[352px] lg:shrink-0 lg:p-6 overflow-y-auto max-h-full',
        className
      )}
    >
      <ManualAutoTabs />
      {config.showBetAmount && <BetAmountField className={config.classNames.betAmountField} />}
      {config.showChips && (
        <ChipValueSummary className={config.classNames.betSummary} placedBet={placedBet} />
      )}
      {config.riskOptions && (
        <RiskSelector options={config.riskOptions} className={config.classNames.risk} />
      )}
      {config.showRows && <RowsSlider className={config.classNames.rows} />}
      {config.showChips && <ChipsGrid className={config.classNames.chips} />}
      {config.showProfitOnWin && <ProfitOnWinField className={config.classNames.profitSection} />}
      {config.showNumberOfBets && (
        <NumberOfBetsField className={config.classNames.numberOfBetsSection} />
      )}
      {config.showAutoBetSummary && (
        <AutoBetSummaryGrid className={config.classNames.autoBetSummarySection} />
      )}
      {config.showConfigure && <ConfigureButton className={config.classNames.configureSection} />}
      {config.tableActions && (
        <TableActions
          variant={config.tableActions}
          onClearTable={onClearTable}
          onUndo={onUndo}
          onAutoPick={onAutoPick}
          className={config.classNames.tableActionsSection}
        />
      )}
      <BetButton
        manualLabel={config.betLabels.manual}
        autoLabel={config.betLabels.auto}
        requiresBet={config.requiresBet}
        onBet={onBet}
        isBetting={isBetting}
        isAutoRunning={isAutoRunning}
        autoActiveLabel={autoRunningLabel ?? config.betLabels.autoActive}
        className={config.classNames.actionButton}
      />
    </div>
  );
}
