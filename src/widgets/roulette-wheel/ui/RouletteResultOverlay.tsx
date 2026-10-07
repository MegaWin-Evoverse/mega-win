'use client';
import { GameResultCard, getResultVariant } from '@/shared/ui/game-result-card';
import { ResultOverlay } from '@/shared/ui/result-overlay';
import { useRouletteStore, useBetResultAutoDismiss } from '@/features/roulette-controls';

export function RouletteResultOverlay() {
  const betResult = useRouletteStore((state) => state.betResult);
  const isSpinning = useRouletteStore((state) => state.isSpinning);

  useBetResultAutoDismiss();

  if (!betResult || isSpinning) return null;

  return (
    <ResultOverlay>
      <GameResultCard
        variant={getResultVariant(betResult.multiplier)}
        multiplier={betResult.multiplier}
        payout={betResult.payout}
        resultValue={betResult.position}
      />
    </ResultOverlay>
  );
}
