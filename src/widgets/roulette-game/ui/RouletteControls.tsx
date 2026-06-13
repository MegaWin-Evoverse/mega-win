'use client';

import { useRouletteControls, useRouletteBet, ROULETTE_LABELS } from '@/features/roulette-controls';
import { useUser } from '@/entities/user';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { GamePanel, NumberOfBetsField } from '@/features/game-panel';

import { BetSummary } from './BetSummary';
import { ChipsGrid } from './ChipsGrid';
import { ChooseActions } from './ChooseActions';

export function RouletteControls() {
  const {
    activeTab,
    selectedChip,
    placedBet,
    numberOfBets,
    isBetActive,
    isSpinning,
    isAutoMode,
    setTab,
    selectChip,
    clearTable,
    undo,
    handleNumberOfBetsChange,
    handleInfinityClick,
  } = useRouletteControls();

  const { gamePointsBalance } = useUser();
  const { placeBet, startAuto, stopAuto, isAutoRunning } = useRouletteBet();

  const canAffordBet = placedBet <= gamePointsBalance;
  const autoBetCount = Math.max(1, parseInt(numberOfBets, 10) || 1);

  function handleAction() {
    if (!isAutoMode) {
      placeBet();
      return;
    }
    if (isAutoRunning) {
      stopAuto();
    } else {
      startAuto(autoBetCount);
    }
  }

  function resolveActionText() {
    if (!isAutoMode) return ROULETTE_LABELS.BET;
    return isAutoRunning ? ROULETTE_LABELS.STOP_AUTOBET : ROULETTE_LABELS.START_AUTOBET;
  }

  const isActionDisabled = isAutoRunning ? false : !isBetActive || isSpinning || !canAffordBet;

  return (
    <GamePanel
      activeTab={activeTab}
      onTabChange={setTab}
      balance={gamePointsBalance}
      actionButtonText={resolveActionText()}
      onAction={handleAction}
      isActionDisabled={isActionDisabled}
      hideBetAmountField={true}
      actionButtonClassName="lg:mt-3"
    >
      <BetSummary
        selectedChip={selectedChip}
        placedBet={placedBet}
        className="order-3 lg:order-none lg:mt-8"
      />

      <ChipsGrid
        selectedChip={selectedChip}
        balance={gamePointsBalance}
        onChipSelect={selectChip}
        className="order-4 lg:order-none lg:mt-6"
      />
      <CollapsibleSection
        isOpen={isAutoMode}
        className="order-5 lg:order-none"
        openClassName="lg:mt-4"
      >
        <NumberOfBetsField
          numberOfBets={numberOfBets}
          onNumberOfBetsChange={handleNumberOfBetsChange}
          onInfinityClick={handleInfinityClick}
        />
      </CollapsibleSection>
      <CollapsibleSection
        isOpen={!isAutoMode}
        className="order-2 hidden lg:order-none lg:grid"
        openClassName="lg:mt-6"
      >
        <ChooseActions onClearTable={clearTable} onUndo={undo} />
      </CollapsibleSection>
    </GamePanel>
  );
}
