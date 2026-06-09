'use client';

import { Trash2, Undo2 } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { ROULETTE_LABELS } from '@/features/roulette-controls';

interface Props {
  onClearTable: () => void;
  onUndo: () => void;
}

export function ChooseActions({ onClearTable, onUndo }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-outfit text-sm font-medium text-brand-text-light/80">
        {ROULETTE_LABELS.CHOOSE_ACTION}
      </span>
      <div className="flex w-full gap-2">
        <Button
          variant="action-muted"
          size="action"
          onClick={onClearTable}
          className="flex-1 gap-2"
        >
          <Trash2 className="size-5 shrink-0" />
          {ROULETTE_LABELS.CLEAR}
        </Button>
        <Button variant="action-muted" size="action" onClick={onUndo} className="flex-1 gap-2">
          <Undo2 className="size-5 shrink-0" />
          {ROULETTE_LABELS.UNDO}
        </Button>
      </div>
    </div>
  );
}
