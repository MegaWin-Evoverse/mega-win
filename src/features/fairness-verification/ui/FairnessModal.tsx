'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';
import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { Button } from '@/shared/ui/button';
import { type Game } from '@/entities/game';
import { useFairnessQuery } from '../model/useFairnessQuery';
import {
  FAIRNESS_TAB,
  FAIRNESS_TAB_ITEMS,
  FAIRNESS_LABELS,
  type FairnessTab,
} from '../model/constants';
import { FairnessSeedsTab } from './FairnessSeedsTab';
import { FairnessVerifyTab } from './FairnessVerifyTab';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  game: Game;
}

export function FairnessModal({ isOpen, onOpenChange, game }: Props) {
  const [activeFairnessTab, setActiveFairnessTab] = useState<FairnessTab>(FAIRNESS_TAB.SEEDS);

  const {
    data: fairnessData,
    isFetching: isFairnessLoading,
    isError: isFairnessError,
    refetch,
  } = useFairnessQuery(isOpen);

  const rotateSeeds = () => {
    refetch();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-[calc(100%-2rem)] sm:w-[705px] sm:max-w-[705px] bg-page-bg border border-border-default p-6 sm:p-10 text-brand-text-white shadow-2xl rounded-[24px] overflow-hidden flex flex-col gap-7 select-none"
      >
        <Button
          variant="tab"
          size="none"
          onClick={() => onOpenChange(false)}
          className="absolute top-5 right-5 w-6 h-6 flex items-center justify-center text-brand-text-light hover:text-brand-text-white transition-colors cursor-pointer"
          aria-label={FAIRNESS_LABELS.close}
        >
          <X className="w-6 h-6" />
        </Button>
        <div className="flex flex-col items-center w-full">
          <DialogTitle className="font-outfit font-semibold text-2xl leading-8 text-center text-brand-text-white w-full">
            {FAIRNESS_LABELS.title}
          </DialogTitle>
        </div>
        <SegmentedTabs
          items={FAIRNESS_TAB_ITEMS}
          value={activeFairnessTab}
          onValueChange={setActiveFairnessTab}
          className="w-full bg-bg-primary border border-border-default"
        />
        {activeFairnessTab === FAIRNESS_TAB.SEEDS ? (
          <FairnessSeedsTab
            fairnessData={fairnessData ?? null}
            isFairnessLoading={isFairnessLoading}
            isFairnessError={isFairnessError}
            rotateSeeds={rotateSeeds}
          />
        ) : (
          <FairnessVerifyTab game={game} />
        )}
      </DialogContent>
    </Dialog>
  );
}
