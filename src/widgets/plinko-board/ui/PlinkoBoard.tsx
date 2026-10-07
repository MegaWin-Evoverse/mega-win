'use client';
import { BetHistory, type PlinkoDrop, type PlinkoHistoryEntry } from '@/features/plinko-bet';
import { MultiplierRow } from '@/entities/game';
import { usePlinkoBoard } from '../model/usePlinkoBoard';

interface Props {
  rows: number;
  multipliers: readonly number[];
  drops: PlinkoDrop[];
  history: PlinkoHistoryEntry[];
  onDropLanded: (id: string, payout: number) => void;
}

export function PlinkoBoard({ rows, multipliers, drops, history, onDropLanded }: Props) {
  const { canvasRef, landedBucket } = usePlinkoBoard({ rows, drops, onDropLanded });

  return (
    <div className="relative flex w-full max-w-[620px] flex-col items-center gap-[32px]">
      <BetHistory history={history} />
      <div className="flex w-full flex-col items-center">
        <canvas ref={canvasRef} className="h-auto w-full" />
        <MultiplierRow multipliers={multipliers} landedBucket={landedBucket} />
      </div>
    </div>
  );
}
