'use client';

import { useShallow } from 'zustand/react/shallow';

import { useKenoStore, KENO_GAME_PHASE, KENO_PAYOUTS, KENO_LABELS } from '@/features/keno-controls';

import { KenoBoard } from './KenoBoard';
import { KenoPayoutTable } from './KenoPayoutTable';
import { KenoWinOverlay } from './KenoWinOverlay';

export function KenoGameField() {
  const { selectedNumbers, drawnNumbers, gamePhase, risk, betAmount, toggleNumber, dismissResult } =
    useKenoStore(
      useShallow((state) => ({
        selectedNumbers: state.selectedNumbers,
        drawnNumbers: state.drawnNumbers,
        gamePhase: state.gamePhase,
        risk: state.risk,
        betAmount: state.betAmount,
        toggleNumber: state.toggleNumber,
        dismissResult: state.dismissResult,
      }))
    );

  const isResultPhase = gamePhase === KENO_GAME_PHASE.RESULT;
  const isIdlePhase = gamePhase === KENO_GAME_PHASE.IDLE;
  const showPayoutTable = !isIdlePhase && selectedNumbers.length > 0;

  const payouts =
    selectedNumbers.length > 0 ? KENO_PAYOUTS[risk][selectedNumbers.length - 1] : null;

  const matchCount = isResultPhase
    ? drawnNumbers.filter((n) => selectedNumbers.includes(n)).length
    : null;

  const multiplier =
    matchCount !== null && selectedNumbers.length > 0
      ? (KENO_PAYOUTS[risk][selectedNumbers.length - 1]?.[matchCount] ?? 0)
      : 0;

  const betValue = parseFloat(betAmount) || 0;
  const winAmount = multiplier > 0 ? parseFloat((betValue * multiplier).toFixed(2)) : 0;

  const showWinOverlay = isResultPhase && multiplier > 0;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 p-8">
      <div className="absolute bottom-0 left-1/2 h-[153px] w-[725px] -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-ellipse blur-[80px]" />

      <KenoBoard
        selectedNumbers={selectedNumbers}
        drawnNumbers={drawnNumbers}
        isResultPhase={isResultPhase}
        onNumberToggle={toggleNumber}
      />

      {showPayoutTable && payouts ? (
        <KenoPayoutTable payouts={payouts} activeMatchCount={matchCount} />
      ) : (
        <div className="flex w-full items-center justify-center rounded-xl border border-keno-cell-border bg-gradient-to-b from-border-default to-brand-btn-gradient-to px-4 py-4">
          <span className="font-outfit text-base font-medium text-brand-text-muted">
            {KENO_LABELS.SELECT_PROMPT}
          </span>
        </div>
      )}

      {showWinOverlay && (
        <KenoWinOverlay
          multiplier={multiplier}
          winAmount={winAmount}
          matchCount={matchCount ?? 0}
          onDismiss={dismissResult}
        />
      )}
    </div>
  );
}
