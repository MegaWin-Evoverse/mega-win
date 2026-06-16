'use client';
import { Trash2, Undo2 } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { TABLE_ACTIONS, type TableActionsVariant, TABLE_ACTIONS_LABELS } from '../model/constants';
import { useTableActions } from '../model/useTableActions';

interface Props {
  variant: TableActionsVariant;
  className?: string;
}

export function TableActions({ variant, className }: Props) {
  const { clearTable, autoPick, undo, isAutoMode } = useTableActions();

  if (variant === TABLE_ACTIONS.ROULETTE) {
    return (
      <CollapsibleSection isOpen={!isAutoMode} className={className} openClassName="lg:mt-6">
        <div className="flex flex-col gap-2">
          <span className="font-outfit text-sm font-medium text-brand-text-light/80">
            {TABLE_ACTIONS_LABELS.CHOOSE_ACTION}
          </span>
          <div className="flex w-full gap-2">
            <Button
              variant="action-muted"
              size="action"
              onClick={clearTable}
              className="flex-1 gap-2"
            >
              <Trash2 className="size-5 shrink-0" />
              {TABLE_ACTIONS_LABELS.CLEAR}
            </Button>
            <Button variant="action-muted" size="action" onClick={undo} className="flex-1 gap-2">
              <Undo2 className="size-5 shrink-0" />
              {TABLE_ACTIONS_LABELS.UNDO}
            </Button>
          </div>
        </div>
      </CollapsibleSection>
    );
  }

  return (
    <div className={cn('flex w-full gap-2', className)}>
      <Button variant="action" size="action" onClick={clearTable} className="flex-1">
        {TABLE_ACTIONS_LABELS.CLEAR_TABLE}
      </Button>
      <Button variant="action" size="action" onClick={autoPick} className="flex-1">
        {TABLE_ACTIONS_LABELS.AUTO_PICK}
      </Button>
    </div>
  );
}
