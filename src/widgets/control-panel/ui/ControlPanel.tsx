'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { type Game, CONTROL_PANEL_CONFIG, TABLE_ACTIONS } from '../model/constants';
import type { ControlPanelState, ControlPanelRenderState } from '../model/types';
import { ManualAutoTabs } from './ManualAutoTabs';
import { BetAmountField } from './BetAmountField';
import { ChipValueSummary } from './ChipValueSummary';
import { RiskSelector } from './RiskSelector';
import { RowsSlider } from './RowsSlider';
import { ChipsGrid } from './ChipsGrid';
import { ProfitOnWinField } from './ProfitOnWinField';
import { NumberOfBetsField } from './NumberOfBetsField';
import { AutoBetSummaryGrid } from './AutoBetSummaryGrid';
import { ConfigureButton } from './ConfigureButton';
import { TableActions } from './TableActions';

interface Props {
  game: Game;
  state: ControlPanelState;
}

export function ControlPanel({ game, state }: Props) {
  const config = CONTROL_PANEL_CONFIG[game];
  // CONTROL_PANEL_CONFIG[game] gates every block, so the rendered fields are
  // exactly the ones this game's state carries — safe to read as the render view.
  const s = state as ControlPanelRenderState;

  return (
    <div className="flex w-full flex-col gap-4 lg:gap-0 bg-bg-primary px-4 py-6 lg:w-[352px] lg:shrink-0 lg:p-6 overflow-y-auto max-h-full">
      <ManualAutoTabs activeTab={s.activeTab} onTabChange={s.setTab} />
      {config.showBetAmount && (
        <BetAmountField
          betAmount={s.betAmount}
          balance={s.balance}
          onBetAmountChange={s.setBetAmount}
          onBetBlur={s.onBetBlur}
          onBetHalf={s.betHalf}
          onBetDouble={s.betDouble}
          onBetMax={s.betMax}
          className={config.classNames.betAmountField}
        />
      )}
      {config.showChips && (
        <ChipValueSummary
          selectedChip={s.selectedChip}
          placedBet={s.placedBet}
          className={config.classNames.betSummary}
        />
      )}
      {config.riskOptions && (
        <RiskSelector
          options={config.riskOptions}
          risk={s.risk}
          onRiskSelect={s.setRisk}
          className={config.classNames.risk}
        />
      )}
      {config.showRows && (
        <RowsSlider rows={s.rows} onRowsChange={s.setRows} className={config.classNames.rows} />
      )}
      {config.showChips && (
        <ChipsGrid
          selectedChip={s.selectedChip}
          onChipSelect={s.selectChip}
          className={config.classNames.chips}
        />
      )}
      {config.showProfitOnWin && (
        <CollapsibleSection
          isOpen={!s.isAutoMode}
          className={config.classNames.profitSection}
          openClassName="lg:mt-4"
        >
          <ProfitOnWinField profitOnWin={s.profitOnWin} />
        </CollapsibleSection>
      )}
      {config.showNumberOfBets && (
        <CollapsibleSection
          isOpen={s.isAutoMode}
          className={config.classNames.numberOfBetsSection}
          openClassName="lg:mt-4"
        >
          <NumberOfBetsField
            numberOfBets={s.numberOfBets}
            onNumberOfBetsChange={s.onNumberOfBetsChange}
            onInfinityClick={s.onInfinityClick}
          />
        </CollapsibleSection>
      )}
      {config.showAutoBetSummary && (
        <CollapsibleSection
          isOpen={s.isAutoMode}
          className={config.classNames.autoBetSummarySection}
          openClassName="lg:mt-4"
        >
          <AutoBetSummaryGrid
            onWinMode={s.onWinMode}
            onLossMode={s.onLossMode}
            stopOnProfit={s.stopOnProfit}
            stopOnLoss={s.stopOnLoss}
          />
        </CollapsibleSection>
      )}
      {config.showConfigure && (
        <CollapsibleSection
          isOpen={s.isAutoMode}
          className={config.classNames.configureSection}
          openClassName="lg:mt-6"
        >
          <ConfigureButton />
        </CollapsibleSection>
      )}
      {config.tableActions === TABLE_ACTIONS.KENO && (
        <TableActions
          variant={TABLE_ACTIONS.KENO}
          onClearTable={s.clearTable}
          onAutoPick={s.autoPick}
          onUndo={s.undo}
          className={config.classNames.tableActionsSection}
        />
      )}
      {config.tableActions === TABLE_ACTIONS.ROULETTE && (
        <CollapsibleSection
          isOpen={!s.isAutoMode}
          className={config.classNames.tableActionsSection}
          openClassName="lg:mt-6"
        >
          <TableActions
            variant={TABLE_ACTIONS.ROULETTE}
            onClearTable={s.clearTable}
            onAutoPick={s.autoPick}
            onUndo={s.undo}
          />
        </CollapsibleSection>
      )}
      <Button
        variant="main"
        size="play"
        onClick={() => {}}
        disabled={s.isActionButtonDisabled}
        className={cn('order-first lg:order-none', config.classNames.actionButton)}
      >
        {s.actionButtonLabel}
      </Button>
    </div>
  );
}
