'use client';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { Button } from '@/shared/ui/button';
import { useGameControlsStore, selectIsAutoMode } from '@/entities/game';
import { AUTO_BET_LABELS } from '../model/constants';

interface Props {
  className?: string;
}

export function ConfigureButton({ className }: Props) {
  const isAutoMode = useGameControlsStore(selectIsAutoMode);

  return (
    <CollapsibleSection isOpen={isAutoMode} className={className} openClassName="lg:mt-6">
      <Button variant="action" size="action" className="w-full">
        {AUTO_BET_LABELS.CONFIGURE}
      </Button>
    </CollapsibleSection>
  );
}
