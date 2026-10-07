import { GameResultCard, getResultVariant } from '@/shared/ui/game-result-card';
import { ResultOverlay } from '@/shared/ui/result-overlay';

interface Props {
  multiplier: number;
  betAmount: number;
  matchCount: number;
}

export function KenoResultOverlay({ multiplier, betAmount, matchCount }: Props) {
  return (
    <ResultOverlay>
      <GameResultCard
        variant={getResultVariant(multiplier)}
        multiplier={multiplier}
        payout={String(betAmount)}
        resultValue={matchCount}
      />
    </ResultOverlay>
  );
}
