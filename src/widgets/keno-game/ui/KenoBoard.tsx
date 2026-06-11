'use client';

import { KENO_TOTAL_NUMBERS } from '@/features/keno-controls';

import { KenoCell } from './KenoCell';

interface Props {
  selectedNumbers: number[];
  drawnNumbers: number[];
  isResultPhase: boolean;
  onNumberToggle: (n: number) => void;
}

const ALL_NUMBERS = Array.from({ length: KENO_TOTAL_NUMBERS }, (_, i) => i + 1);

export function KenoBoard({ selectedNumbers, drawnNumbers, isResultPhase, onNumberToggle }: Props) {
  const selectedSet = new Set(selectedNumbers);
  const drawnSet = new Set(drawnNumbers);

  return (
    <div className="flex flex-wrap justify-center gap-[4.75px]">
      {ALL_NUMBERS.map((n) => (
        <KenoCell
          key={n}
          number={n}
          isSelected={selectedSet.has(n)}
          isHit={isResultPhase && selectedSet.has(n) && drawnSet.has(n)}
          isDrawnMiss={isResultPhase && !selectedSet.has(n) && drawnSet.has(n)}
          isResultPhase={isResultPhase}
          onNumberToggle={onNumberToggle}
        />
      ))}
    </div>
  );
}
