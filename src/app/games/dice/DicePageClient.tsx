'use client';
import { ControlPanel } from '@/widgets/control-panel';
import { DiceGame, useDiceGame } from '@/widgets/dice-game';
import { GameSettingsBar } from '@/widgets/game-settings-bar';
import { GAME } from '@/entities/game';
import { BetsStory } from '@/entities/bets-story';
import { RevealOnScroll } from '@/shared/ui/RevealOnScroll';

export function DicePageClient() {
  const {
    rollover,
    history,
    lastRoll,
    multiplierDisplay,
    rolloverDisplay,
    chanceDisplay,
    isAutoRunning,
    handleRolloverChange,
    handleBet,
  } = useDiceGame();

  return (
    <div className="game-page mx-auto flex w-full max-w-[1017px] flex-col px-4 py-6 lg:px-6">
      <RevealOnScroll
        triggerOn="mount"
        className="game-layout flex w-full flex-col overflow-hidden lg:flex-row lg:rounded-[16px]"
      >
        <ControlPanel game={GAME.DICE} onBet={handleBet} isAutoRunning={isAutoRunning} />
        <DiceGame
          rollover={rollover}
          history={history}
          lastRoll={lastRoll}
          multiplierDisplay={multiplierDisplay}
          rolloverDisplay={rolloverDisplay}
          chanceDisplay={chanceDisplay}
          onRolloverChange={handleRolloverChange}
        />
      </RevealOnScroll>
      <GameSettingsBar game={GAME.DICE} className="mt-1" />
      <RevealOnScroll className="mt-10 w-full">
        <BetsStory />
      </RevealOnScroll>
    </div>
  );
}
