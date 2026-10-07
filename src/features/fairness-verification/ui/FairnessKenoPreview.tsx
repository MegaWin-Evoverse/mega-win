'use client';
import { cn } from '@/shared/lib/cn';
import { KENO_VERIFY_NUMBERS, KENO_VERIFY_CELL_CLASSES } from '../model/constants';
import { useKenoVerifyOutcome } from '../model/useKenoVerifyOutcome';

interface Props {
  clientSeed: string;
  serverSeed: string;
  nonce: string;
}

export function FairnessKenoPreview({ clientSeed, serverSeed, nonce }: Props) {
  const outcome = useKenoVerifyOutcome(clientSeed, serverSeed, nonce);
  const drawnNumbers = outcome?.drawnNumbers ?? null;

  return (
    <div className="grid grid-cols-8 gap-[4.75px] w-full">
      {KENO_VERIFY_NUMBERS.map((number) => {
        const isDrawn = drawnNumbers?.has(number - 1) ?? false;
        return (
          <div
            key={number}
            className={cn(
              'aspect-square flex items-center justify-center rounded-lg font-outfit text-sm font-semibold',
              isDrawn ? KENO_VERIFY_CELL_CLASSES.drawn : KENO_VERIFY_CELL_CLASSES.idle
            )}
          >
            {number}
          </div>
        );
      })}
    </div>
  );
}
