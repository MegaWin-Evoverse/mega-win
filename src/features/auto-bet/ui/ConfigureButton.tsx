'use client';
import { useState } from 'react';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { Button } from '@/shared/ui/button';
import { useGameControlsStore, selectIsAutoMode } from '@/entities/game';
import { AUTO_BET_LABELS } from '../model/constants';
import { ConfigureAutoBetModal } from './ConfigureAutoBetModal';

interface Props {
  className?: string;
}

export function ConfigureButton({ className }: Props) {
  const isAutoMode = useGameControlsStore(selectIsAutoMode);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <CollapsibleSection isOpen={isAutoMode} className={className} openClassName="lg:mt-6">
      <Button
        variant="action"
        size="action"
        className="w-full"
        onClick={() => setIsModalOpen(true)}
      >
        {AUTO_BET_LABELS.CONFIGURE}
      </Button>
      <ConfigureAutoBetModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </CollapsibleSection>
  );
}
