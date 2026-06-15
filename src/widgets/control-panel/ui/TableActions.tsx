'use client';
import { Trash2, Undo2 } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { CONTROL_PANEL_LABELS, TABLE_ACTIONS, type TableActionsVariant } from '../model/constants';

interface Props {
  variant: TableActionsVariant;
  onClearTable: () => void;
  onAutoPick: () => void;
  onUndo: () => void;
  className?: string;
}

export function TableActions({ variant, onClearTable, onAutoPick, onUndo, className }: Props) {
  if (variant === TABLE_ACTIONS.ROULETTE) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <span className="font-outfit text-sm font-medium text-brand-text-light/80">
          {CONTROL_PANEL_LABELS.CHOOSE_ACTION}
        </span>
        <div className="flex w-full gap-2">
          <Button
            variant="action-muted"
            size="action"
            onClick={onClearTable}
            className="flex-1 gap-2"
          >
            <Trash2 className="size-5 shrink-0" />
            {CONTROL_PANEL_LABELS.CLEAR}
          </Button>
          <Button variant="action-muted" size="action" onClick={onUndo} className="flex-1 gap-2">
            <Undo2 className="size-5 shrink-0" />
            {CONTROL_PANEL_LABELS.UNDO}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex w-full gap-2', className)}>
      <Button variant="action" size="action" onClick={onClearTable} className="flex-1">
        {CONTROL_PANEL_LABELS.CLEAR_TABLE}
      </Button>
      <Button variant="action" size="action" onClick={onAutoPick} className="flex-1">
        {CONTROL_PANEL_LABELS.AUTO_PICK}
      </Button>
    </div>
  );
}
