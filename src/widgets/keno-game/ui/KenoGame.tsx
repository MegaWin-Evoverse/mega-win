'use client';
import { Button } from '@/shared/ui/button';
import { Board } from './Board';
import { Payout } from './Payout';
import { WinModal } from './WinModal';
import { useKenoGame } from '../model/useKenoGame';
import { LABELS } from '../model/constants';

export function KenoGame() {
  const {
    phase,
    matchCount,
    winMultiplier,
    currentPayouts,
    currentChances,
    betAmount,
    handleNumberToggle,
    handleReset,
    getCellState,
  } = useKenoGame();

  return (
    <div className="relative isolate flex w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-[0_16px_16px_0] bg-bg-primary p-8">
      <div
        className="pointer-events-none absolute bottom-[-146px] left-1/2 h-[153px] w-[725px] -translate-x-1/2 bg-keno-glow blur-[300px]"
        aria-hidden="true"
      />

      <Board getCellState={getCellState} onNumberToggle={handleNumberToggle} />

      {phase === 'default' && (
        <div className="flex h-[60px] w-full items-center justify-center rounded-xl bg-gradient-to-b from-brand-border to-brand-btn-gradient-to font-outfit text-sm font-semibold text-brand-text-muted">
          {LABELS.SELECT_PROMPT}
        </div>
      )}

      {phase !== 'default' && currentPayouts.length > 0 && (
        <Payout
          payouts={currentPayouts}
          chances={currentChances}
          matchCount={matchCount}
          phase={phase}
          betAmount={betAmount}
        />
      )}

      {phase === 'lose' && (
        <Button variant="outline" className="h-12 w-full" onClick={handleReset}>
          {LABELS.PLAY_AGAIN}
        </Button>
      )}

      {phase === 'win' && (
        <WinModal
          multiplier={winMultiplier}
          betAmount={betAmount}
          matchCount={matchCount}
          onPlayAgain={handleReset}
        />
      )}
    </div>
  );
}
