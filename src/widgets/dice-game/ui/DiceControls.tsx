'use client';
import { useDiceControls } from '@/features/dice-controls';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { GamePanel, NumberOfBetsField } from '@/features/game-panel';
import { ProfitOnWinField } from './ProfitOnWinField';
import { AutoBetSummaryGrid } from './AutoBetSummaryGrid';
import { ConfigureButton } from './ConfigureButton';

export function DiceControls() {
  const {
    activeTab,
    betAmount,
    balance,
    profitOnWin,
    numberOfBets,
    onWinMode,
    onLossMode,
    stopOnProfit,
    stopOnLoss,
    isAutoMode,
    actionButtonLabel,
    isActionButtonDisabled,
    setTab,
    setBetAmount,
    betHalf,
    betDouble,
    betMax,
    handleNumberOfBetsChange,
    handleInfinityClick,
    onBetBlur,
  } = useDiceControls();

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
      actionButtonClassName="lg:mt-3"
    >
      {/* Profit on Win - Manual Mode Only */}
      <CollapsibleSection
        isOpen={!isAutoMode}
        className="order-4 lg:order-none"
        openClassName="lg:mt-4"
      >
        <ProfitOnWinField profitOnWin={profitOnWin} />
      </CollapsibleSection>

      {/* Number of Bets - Auto Mode Only */}
      <CollapsibleSection
        isOpen={isAutoMode}
        className="order-4 lg:order-none"
        openClassName="lg:mt-4"
      >
        <NumberOfBetsField
          numberOfBets={numberOfBets}
          onNumberOfBetsChange={handleNumberOfBetsChange}
          onInfinityClick={handleInfinityClick}
        />
      </CollapsibleSection>

      {/* Auto-Bet summary grid - Auto Mode Only */}
      <CollapsibleSection
        isOpen={isAutoMode}
        className="order-5 lg:order-none"
        openClassName="lg:mt-4"
      >
        <AutoBetSummaryGrid
          onWinMode={onWinMode}
          onLossMode={onLossMode}
          stopOnProfit={stopOnProfit}
          stopOnLoss={stopOnLoss}
        />
      </CollapsibleSection>

      {/* Configure Button - Auto Mode Only */}
      <CollapsibleSection
        isOpen={isAutoMode}
        className="order-2 lg:order-none"
        openClassName="lg:mt-6"
      >
        <ConfigureButton />
      </CollapsibleSection>
    </GamePanel>
  );
}
