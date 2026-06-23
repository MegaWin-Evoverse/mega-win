'use client';
import { useDiceGame } from '../model/useDiceGame';
import { History } from './History';
import { Slider } from './Slider';
import { Stats } from './Stats';

export function DiceGame() {
  const {
    rollover,
    history,
    lastRoll,
    multiplierDisplay,
    rolloverDisplay,
    chanceDisplay,
    handleRolloverChange,
  } = useDiceGame();

  return (
    <div className="relative isolate flex w-full flex-col items-center justify-center gap-[140px] overflow-hidden rounded-[0_16px_16px_0] bg-bg-primary p-8">
      <div
        className="pointer-events-none absolute bottom-[-146px] left-1/2 h-[153px] w-[725px] -translate-x-1/2 bg-dice-glow blur-[300px]"
        aria-hidden="true"
      />

      <div className="flex w-full flex-col items-end gap-[110px]">
        <History history={history} />
        <Slider rollover={rollover} lastRoll={lastRoll} onRolloverChange={handleRolloverChange} />
      </div>

      <Stats
        multiplierDisplay={multiplierDisplay}
        rolloverDisplay={rolloverDisplay}
        chanceDisplay={chanceDisplay}
      />
    </div>
  );
}
