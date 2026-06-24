'use client';
import { ControlPanel } from '@/widgets/control-panel';
import { KenoGame, useKenoGame } from '@/widgets/keno-game';
import { GameSettingsBar } from '@/widgets/game-settings-bar';
import { GAME } from '@/entities/game';
import { BetsStory } from '@/entities/bets-story';

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
    handleAutoPick,
    isAutoRunning,
  } = useKenoGame();

  return (
    <div className="game-page flex flex-col items-center px-4 py-6 lg:px-6">
      <div className="game-layout mx-auto flex w-full max-w-[1017px] flex-col overflow-hidden lg:flex-row lg:rounded-[16px] mb-2">
        <ControlPanel
          game={GAME.KENO}
          onBet={handlePlay}
          onClearTable={handleReset}
          onAutoPick={handleAutoPick}
          isAutoRunning={isAutoRunning}
        />
        <div className="order-first w-full flex-1 lg:order-none lg:min-h-0">
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
      </div>
      <GameSettingsBar game={GAME.KENO} className="mt-1" />
      <BetsStory className="mt-10 w-full max-w-[1017px]" />
    </div>
  );
}
