'use client';
import { usePlinkoControls } from '@/features/plinko-controls';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { GamePanel, NumberOfBetsField } from '@/features/game-panel';
import { RiskSelector } from './RiskSelector';
import { RowsSlider } from './RowsSlider';

export function PlinkoControls() {
  const {
    activeTab,
    betAmount,
    balance,
    risk,
    rows,
    numberOfBets,
    isAutoMode,
    actionButtonLabel,
    isActionButtonDisabled,
    setTab,
    setBetAmount,
    setRisk,
    betHalf,
    betDouble,
    betMax,
    handleRowsChange,
    handleNumberOfBetsChange,
    handleInfinityClick,
    onBetBlur,
  } = usePlinkoControls();

  return (
    <GamePanel
      activeTab={activeTab}
      onTabChange={setTab}
      betAmount={betAmount}
      balance={balance}
      onBetAmountChange={setBetAmount}
      onBetBlur={onBetBlur}
      onBetHalf={betHalf}
      onBetDouble={betDouble}
      onBetMax={betMax}
      actionButtonText={actionButtonLabel}
      onAction={() => {}}
      isActionDisabled={isActionButtonDisabled}
      betAmountFieldClassName="order-3 lg:order-none lg:mt-8"
      actionButtonClassName="lg:mt-6"
    >
      <RiskSelector risk={risk} onRiskSelect={setRisk} className="order-4 lg:order-none lg:mt-4" />

      <RowsSlider
        rows={rows}
        onRowsChange={handleRowsChange}
        className="order-5 lg:order-none lg:mt-4"
      />
      <CollapsibleSection
        isOpen={isAutoMode}
        className="order-6 lg:order-none"
        openClassName="lg:mt-4"
      >
        <NumberOfBetsField
          numberOfBets={numberOfBets}
          onNumberOfBetsChange={handleNumberOfBetsChange}
          onInfinityClick={handleInfinityClick}
        />
      </CollapsibleSection>
    </GamePanel>
  );
}
