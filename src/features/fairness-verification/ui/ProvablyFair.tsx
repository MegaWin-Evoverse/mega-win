'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import type { Game } from '@/entities/game';
import { FAIRNESS_LABELS } from '../model/constants';
import { FairnessModal } from './FairnessModal';

interface Props {
  game: Game;
}

export function ProvablyFair({ game }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <FairnessModal isOpen={isOpen} onOpenChange={setIsOpen} game={game} />
      <Button
        variant="tab"
        size="none"
        onClick={() => setIsOpen(true)}
        className="flex flex-row items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ml-auto"
        title={FAIRNESS_LABELS.verifyFairness}
        aria-label={FAIRNESS_LABELS.verifyFairness}
      >
        <span className="font-outfit font-semibold text-xs leading-4 text-brand-green-to tracking-wider uppercase">
          {FAIRNESS_LABELS.provablyFair}
        </span>
        <span className="w-4 h-4 flex items-center justify-center rounded-full bg-brand-green-to text-bg-primary">
          <Check className="size-2 text-bg-primary" strokeWidth={4} />
        </span>
      </Button>
    </>
  );
}
