'use client';
import { ControlPanel } from '@/widgets/control-panel';
import { useRouletteBet, useRouletteStore } from '@/features/roulette-controls';
import { GAME } from '@/entities/game';

export function RouletteControls() {
  const { onBet, isAutoRunning, autoBetLabel } = useRouletteBet();
  const placedBet = useRouletteStore((state) => state.placedBet);
  const clearTable = useRouletteStore((state) => state.clearTable);
  const undo = useRouletteStore((state) => state.undo);
  return (
    <ControlPanel
      game={GAME.ROULETTE}
      onBet={onBet}
      placedBet={placedBet}
      isAutoRunning={isAutoRunning}
      autoRunningLabel={autoBetLabel}
      onClearTable={clearTable}
      onUndo={undo}
    />
  );
}
