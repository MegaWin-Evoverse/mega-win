'use client';
import type { CSSProperties } from 'react';
import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { cn } from '@/shared/lib/cn';
import { playSound } from '@/shared/lib/playSound';
import { MIN_ROLLOVER, MAX_ROLLOVER, STEP, TICK_MARKS, ROLL_DECIMALS } from '../model/constants';
import type { RollEntry } from '../model/types';

interface Props {
  rollover: number;
  lastRoll: RollEntry | null;
  onRolloverChange: (value: number) => void;
}

export function Slider({ rollover, lastRoll, onRolloverChange }: Props) {
  const thumbPct = ((rollover - MIN_ROLLOVER) / (MAX_ROLLOVER - MIN_ROLLOVER)) * 100;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="relative h-[53px] w-full">
        {lastRoll && (
          <div
            style={{ '--roll': `${lastRoll.value}%` } as CSSProperties}
            className="absolute bottom-0 left-[var(--roll)] flex -translate-x-1/2 flex-col items-center"
          >
            <div
              className={cn(
                'flex items-center justify-center rounded-[9px] p-1',
                lastRoll.isWin
                  ? 'bg-dice-tooltip-win'
                  : 'bg-gradient-to-r from-brand-btn-gradient-to/40 via-destructive/40 to-brand-btn-gradient-to/40 backdrop-blur-sm'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-[6px] px-2 py-2 font-outfit text-sm font-semibold text-brand-text-white',
                  lastRoll.isWin ? 'bg-dice-tooltip-win-inner' : 'bg-bg-page'
                )}
              >
                {lastRoll.value.toFixed(ROLL_DECIMALS)}
              </div>
            </div>
            <div
              className={cn(
                'h-0 w-0 border-x-[6px] border-x-transparent border-t-[8px]',
                lastRoll.isWin ? 'border-t-dice-tooltip-win' : 'border-t-destructive/40'
              )}
            />
          </div>
        )}
      </div>

      <div
        style={{ '--tp': `${thumbPct}%` } as CSSProperties}
        className="flex h-12 w-full items-center rounded-xl border-[6px] border-brand-border bg-bg-primary px-4"
      >
        <SliderPrimitive.Root
          value={rollover}
          min={MIN_ROLLOVER}
          max={MAX_ROLLOVER}
          step={STEP}
          thumbAlignment="edge"
          onValueChange={(val) => {
            const next = Array.isArray(val) ? val[0] : val;
            if (typeof next === 'number') {
              playSound('tick');
              onRolloverChange(next);
            }
          }}
          className="w-full"
        >
          <SliderPrimitive.Control className="relative flex h-8 w-full touch-none items-center select-none">
            <SliderPrimitive.Track className="relative grow overflow-hidden rounded-full h-[11px]">
              <div className="absolute left-0 top-0 h-full rounded-l-full bg-destructive w-[var(--tp)]" />
              <div className="absolute left-[var(--tp)] right-0 top-0 h-full rounded-r-full bg-brand-green-to" />
              <SliderPrimitive.Indicator className="sr-only" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="relative z-10 flex h-8 w-[36.8px] shrink-0 cursor-grab items-center justify-center rounded bg-dice-thumb focus-visible:outline-none active:cursor-grabbing">
              <div className="flex items-center gap-[4.8px]">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-[15.2px] w-[2.4px] rounded-full bg-bg-primary" />
                ))}
              </div>
            </SliderPrimitive.Thumb>
          </SliderPrimitive.Control>
        </SliderPrimitive.Root>
      </div>

      <div className="flex w-full items-start justify-between px-4">
        {TICK_MARKS.map((val) => (
          <div key={val} className="flex flex-col items-center gap-0.5">
            <div className="h-0 w-0 border-x-[6px] border-x-transparent border-t-[11px] border-t-brand-border" />
            <span className="font-outfit text-xs font-semibold text-brand-text-white/95">
              {val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
