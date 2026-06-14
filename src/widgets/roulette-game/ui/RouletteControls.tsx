'use client';
import { useRouletteControls, ROULETTE_LABELS } from '@/features/roulette-controls';
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
    balance,
    numberOfBets,
    isBetActive,
    isAutoMode,
    setTab,
    selectChip,
    clearTable,
    undo,
    handleNumberOfBetsChange,
    handleInfinityClick,
  } = useRouletteControls();

  return (
    <GamePanel
      activeTab={activeTab}
      onTabChange={setTab}
      balance={balance}
      actionButtonText={ROULETTE_LABELS.BET}
      onAction={() => {}}
      isActionDisabled={!isBetActive}
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
        className="order-2 lg:order-none"
        openClassName="lg:mt-6"
      >
        <ChooseActions onClearTable={clearTable} onUndo={undo} />
      </CollapsibleSection>
    </GamePanel>
  );
}
