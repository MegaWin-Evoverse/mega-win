import { Eraser, Undo2 } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { ROULETTE_LABELS } from '@/features/roulette-controls';

interface Props {
  onClearTable: () => void;
  onUndo: () => void;
  buttonClassName?: string;
}

export function TableActions({ onClearTable, onUndo, buttonClassName }: Props) {
  return (
    <>
      <Button
        variant="action-muted"
        size="none"
        onClick={onClearTable}
        aria-label={ROULETTE_LABELS.CLEAR}
        className={cn('flex items-center justify-center text-brand-green-to', buttonClassName)}
      >
        <Eraser className="size-[min(20px,4cqw)]" />
      </Button>
      <Button
        variant="action-muted"
        size="none"
        onClick={onUndo}
        aria-label={ROULETTE_LABELS.UNDO}
        className={cn('flex items-center justify-center text-brand-green-to', buttonClassName)}
      >
        <Undo2 className="size-[min(20px,4cqw)]" />
      </Button>
    </>
  );
}
