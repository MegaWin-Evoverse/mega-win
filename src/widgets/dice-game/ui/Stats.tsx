import { X, RefreshCw, Percent } from 'lucide-react';
import { LABELS } from '../model/constants';

interface Props {
  multiplierDisplay: string;
  rolloverDisplay: string;
  chanceDisplay: string;
}

export function Stats({ multiplierDisplay, rolloverDisplay, chanceDisplay }: Props) {
  return (
    <div className="flex w-full items-center gap-[34px] rounded-lg bg-gradient-to-b from-brand-border/40 to-brand-btn-gradient-to/40 px-3 py-5">
      <div className="flex flex-1 flex-col gap-2">
        <span className="font-outfit text-base font-medium text-brand-text-white">
          {LABELS.MULTIPLIER}
        </span>
        <div className="flex h-11 items-center justify-between rounded-lg border border-brand-border bg-brand-btn-gradient-to/50 px-3">
          <span className="font-outfit text-sm text-brand-text-light">{multiplierDisplay}</span>
          <X className="h-5 w-5 text-brand-text-light" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <span className="font-outfit text-base font-medium text-brand-text-white">
          {LABELS.ROLLOVER}
        </span>
        <div className="flex h-11 items-center justify-between rounded-lg border border-brand-border bg-brand-btn-gradient-to/50 px-3">
          <span className="font-outfit text-sm text-brand-text-light">{rolloverDisplay}</span>
          <RefreshCw className="h-5 w-5 text-brand-text-light" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <span className="font-outfit text-base font-medium text-brand-text-white">
          {LABELS.CHANCE}
        </span>
        <div className="flex h-11 items-center justify-between rounded-lg border border-brand-border bg-brand-btn-gradient-to/50 px-3">
          <span className="font-outfit text-sm text-brand-text-light">{chanceDisplay}</span>
          <Percent className="h-5 w-5 text-brand-text-light" />
        </div>
      </div>
    </div>
  );
}
