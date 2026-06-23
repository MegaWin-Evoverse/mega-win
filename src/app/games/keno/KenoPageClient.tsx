'use client';
import { ControlPanel } from '@/widgets/control-panel';
import { KenoGame, useKenoGame } from '@/widgets/keno-game';
import { GAME } from '@/entities/game';

export function KenoPageClient() {
  const {
    phase,
    matchCount,
    winMultiplier,
    currentPayouts,
    currentChances,
    betAmount,
    getCellState,
    handleNumberToggle,
    handlePlay,
    handleReset,
  } = useKenoGame();

  return (
    <div className="flex">
      <ControlPanel game={GAME.KENO} onBet={handlePlay} />
      <KenoGame
        phase={phase}
        matchCount={matchCount}
        winMultiplier={winMultiplier}
        currentPayouts={currentPayouts}
        currentChances={currentChances}
        betAmount={betAmount}
        getCellState={getCellState}
        onNumberToggle={handleNumberToggle}
        onReset={handleReset}
      />
    </div>
  );
}
