'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import type { CellState } from '../model/types';
import { CELL_STATE_CLASSES } from '../model/constants';

interface Props {
  number: number;
  state: CellState;
  onSelect: (n: number) => void;
}

export function Cell({ number, state, onSelect }: Props) {
  const isInteractive = state === 'idle' || state === 'selected';

  return (
    <Button
      variant="ghost"
      size="none"
      disabled={!isInteractive}
      onClick={() => onSelect(number)}
      aria-label={`Number ${number}`}
      aria-pressed={state === 'selected' || state === 'hit'}
      className={cn(
        'relative aspect-square w-full rounded-xl font-outfit text-xl font-semibold transition-all disabled:opacity-100 disabled:pointer-events-none',
        CELL_STATE_CLASSES[state]
      )}
    >
      {state === 'drawn' && (
        <>
          <span
            className="pointer-events-none absolute top-1.5 left-1.5 h-3 w-3 border-t-2 border-l-2 border-destructive"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute top-1.5 right-1.5 h-3 w-3 border-t-2 border-r-2 border-destructive"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute bottom-1.5 left-1.5 h-3 w-3 border-b-2 border-l-2 border-destructive"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute bottom-1.5 right-1.5 h-3 w-3 border-b-2 border-r-2 border-destructive"
            aria-hidden="true"
          />
        </>
      )}
      {number}
    </Button>
  );
}
