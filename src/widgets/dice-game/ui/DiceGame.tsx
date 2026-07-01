'use client';
import type { RollEntry } from '../model/types';
import { History } from './History';
import { Slider } from './Slider';
import { Stats } from './Stats';

interface Props {
  rollover: number;
  history: RollEntry[];
  lastRoll: RollEntry | null;
  multiplierDisplay: string;
  rolloverDisplay: string;
  chanceDisplay: string;
  onRolloverChange: (value: number) => void;
}

export function DiceGame({
  rollover,
  history,
  lastRoll,
  multiplierDisplay,
  rolloverDisplay,
  chanceDisplay,
  onRolloverChange,
}: Props) {
  return (
    <div className="relative isolate flex w-full flex-col items-center justify-center gap-16 overflow-hidden rounded-[0_16px_16px_0] bg-bg-primary p-4 lg:gap-[140px] lg:p-8">
      <div
        className="pointer-events-none absolute bottom-[-146px] left-1/2 h-[153px] w-[725px] -translate-x-1/2 bg-dice-glow blur-[300px]"
        aria-hidden="true"
      />
      <div className="flex w-full flex-col items-end gap-[110px]">
        <History history={history} />
        <Slider rollover={rollover} lastRoll={lastRoll} onRolloverChange={onRolloverChange} />
      </div>
      <Stats
        multiplierDisplay={multiplierDisplay}
        rolloverDisplay={rolloverDisplay}
        chanceDisplay={chanceDisplay}
      />
    </div>
  );
}
