'use client';
import { useKenoControls, KENO_LABELS } from '@/features/keno-controls';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { GamePanel, NumberOfBetsField } from '@/features/game-panel';
import { RiskSelector } from './RiskSelector';
import { TableActions } from './TableActions';

export function KenoControls() {
  const {
    activeTab,
    betAmount,
    balance,
    risk,
    numberOfBets,
    isAutoMode,
    isActionButtonDisabled,
    setTab,
    setBetAmount,
    setRisk,
    betHalf,
    betDouble,
    betMax,
    clearTable,
    autoPick,
    handleNumberOfBetsChange,
    handleInfinityClick,
    onBetBlur,
  } = useKenoControls();

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
      actionButtonText={KENO_LABELS.BET}
      onAction={() => {}}
      isActionDisabled={isActionButtonDisabled}
      betAmountFieldClassName="order-3 lg:order-none lg:mt-8"
      actionButtonClassName="lg:mt-3"
    >
      <RiskSelector risk={risk} onRiskSelect={setRisk} className="order-4 lg:order-none lg:mt-4" />

      {/* Number of Bets - Auto Mode Only */}
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

      <TableActions
        onClearTable={clearTable}
        onAutoPick={autoPick}
        className="order-2 lg:order-none lg:mt-6"
      />
    </GamePanel>
  );
}
