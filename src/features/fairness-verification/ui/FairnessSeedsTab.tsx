'use client';
import { Button } from '@/shared/ui/button';
import { ErrorState } from '@/shared/ui/error-state';
import { FormFieldsSkeleton } from '@/shared/ui/skeleton';
import type { FairnessData } from '../model/types';
import { LOADING_PLACEHOLDER, FAIRNESS_LABELS } from '../model/constants';
import { CopyInput } from './CopyInput';

interface Props {
  fairnessData: FairnessData | null;
  isFairnessLoading: boolean;
  isFairnessError: boolean;
  rotateSeeds: () => void;
}

export function FairnessSeedsTab({
  fairnessData,
  isFairnessLoading,
  isFairnessError,
  rotateSeeds,
}: Props) {
  if (isFairnessError) {
    return <ErrorState onRetry={rotateSeeds} />;
  }

  if (isFairnessLoading && !fairnessData) {
    return <FormFieldsSkeleton count={5} className="animate-in fade-in duration-200" />;
  }

  return (
    <div className="flex flex-col gap-7 animate-in fade-in duration-200">
      <div className="flex flex-col gap-3 w-full">
        <CopyInput
          label={FAIRNESS_LABELS.activeClientSeed}
          value={fairnessData?.clientSeed ?? LOADING_PLACEHOLDER}
        />
        <CopyInput
          label={FAIRNESS_LABELS.activeServerSeedHash}
          value={fairnessData?.hashedServerSeed ?? LOADING_PLACEHOLDER}
        />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <h3 className="font-outfit font-semibold text-lg leading-5 text-[#FDFDFD]">
          {FAIRNESS_LABELS.rotateSeedPair}
        </h3>
        <div className="flex flex-col gap-3 w-full">
          <CopyInput
            label={FAIRNESS_LABELS.totalBets}
            value={fairnessData ? String(fairnessData.nonce) : LOADING_PLACEHOLDER}
          />
          <div className="flex flex-row items-end gap-7 w-full">
            <div className="flex-1 min-w-0">
              <CopyInput
                label={FAIRNESS_LABELS.newClientSeed}
                value={fairnessData?.clientSeed ?? LOADING_PLACEHOLDER}
              />
            </div>
            <Button
              variant="tab"
              size="none"
              disabled={isFairnessLoading}
              onClick={rotateSeeds}
              className="flex h-11 w-22 items-center justify-center rounded-lg border border-[#1B1F26] bg-gradient-to-b from-[#1B1F26] to-[#2B303B] hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all font-outfit font-medium text-base text-[#FDFDFD] cursor-pointer"
            >
              {isFairnessLoading ? FAIRNESS_LABELS.wait : FAIRNESS_LABELS.change}
            </Button>
          </div>
          <CopyInput
            label={FAIRNESS_LABELS.nextServerSeedHash}
            value={fairnessData?.nextHashedServerSeed ?? LOADING_PLACEHOLDER}
          />
        </div>
      </div>
    </div>
  );
}
