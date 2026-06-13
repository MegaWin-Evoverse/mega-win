'use client';

import { GameResultCard, getResultVariant } from '@/shared/ui/game-result-card';
import { useRouletteStore, useBetResultAutoDismiss } from '@/features/roulette-controls';

export function RouletteResultOverlay() {
  const betResult = useRouletteStore((state) => state.betResult);
  const isSpinning = useRouletteStore((state) => state.isSpinning);

  useBetResultAutoDismiss();

  if (!betResult || isSpinning) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-page-bg/40 backdrop-blur-md">
      <GameResultCard
        variant={getResultVariant(betResult.multiplier)}
        multiplier={betResult.multiplier}
        payout={betResult.payout}
        resultValue={betResult.position}
      />
    </div>
  );
}
