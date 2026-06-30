'use client';
import { useShallow } from 'zustand/react/shallow';
import {
  GAME,
  PLINKO_MULTIPLIERS,
  useGameControlsStore,
  type GameControlsState,
} from '@/entities/game';
import { usePlinkoGame } from '@/features/plinko-bet';
import { PlinkoBoard, PlinkoResultOverlay } from '@/widgets/plinko-board';
import { ControlPanel } from '@/widgets/control-panel';
import { GameSettingsBar } from '@/widgets/game-settings-bar';
import { BetsStory } from '@/entities/bets-story';
import { RevealOnScroll } from '@/shared/ui/RevealOnScroll';

function selectBoard(state: GameControlsState) {
  return { rows: state.rows, risk: state.risk };
}

export function PlinkoGame() {
  const { rows, risk } = useGameControlsStore(useShallow(selectBoard));
  const {
    placeBet,
    drops,
    history,
    onDropLanded,
    isBetting,
    isAutoRunning,
    autoBetLabel,
    result,
    dismissResult,
  } = usePlinkoGame();
  const multipliers = PLINKO_MULTIPLIERS[risk][rows];

  return (
    <div className="mx-auto flex w-full max-w-[1017px] flex-col">
      <RevealOnScroll
        triggerOn="mount"
        className="flex w-full flex-col-reverse items-stretch overflow-hidden rounded-2xl pt-4 lg:flex-row lg:pt-10"
      >
        <ControlPanel
          game={GAME.PLINKO}
          onBet={placeBet}
          isBetting={isBetting}
          isAutoRunning={isAutoRunning}
          autoRunningLabel={autoBetLabel}
        />
        <div className="relative flex flex-1 items-start justify-center bg-bg-primary px-4 pt-6 pb-8 lg:px-10 lg:pt-10 lg:pb-12">
          <PlinkoBoard
            rows={rows}
            multipliers={multipliers}
            drops={drops}
            history={history}
            onDropLanded={onDropLanded}
          />
          <PlinkoResultOverlay result={result} onDismiss={dismissResult} />
        </div>
      </RevealOnScroll>
      <GameSettingsBar game={GAME.PLINKO} className="mt-1" />
      <RevealOnScroll className="mt-10 w-full">
        <BetsStory />
      </RevealOnScroll>
    </div>
  );
}
