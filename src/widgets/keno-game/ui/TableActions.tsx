'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { KENO_LABELS } from '@/features/keno-controls';

interface Props {
  onClearTable: () => void;
  onAutoPick: () => void;
  className?: string;
}

export function TableActions({ onClearTable, onAutoPick, className }: Props) {
  return (
    <div className={cn('flex w-full gap-2', className)}>
      <Button variant="action" size="action" onClick={onClearTable} className="flex-1">
        {KENO_LABELS.CLEAR_TABLE}
      </Button>
      <Button variant="action" size="action" onClick={onAutoPick} className="flex-1">
        {KENO_LABELS.AUTO_PICK}
      </Button>
    </div>
  );
}
