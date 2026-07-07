'use client';
import type { ReactElement } from 'react';
import { Volume2, FileText } from 'lucide-react';
import { Switch } from '@/shared/ui/switch';
import { Slider } from '@/shared/ui/slider';
import { Button } from '@/shared/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover';
import { VOLUME_MIN, VOLUME_MAX, VOLUME_STEP, GAME_SETTINGS_LABELS } from '../model/constants';

interface Props {
  trigger: ReactElement;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenRules: () => void;
  turboMode: boolean;
  setTurboMode: (val: boolean) => void;
  maxBet: boolean;
  setMaxBet: (val: boolean) => void;
  volume: number;
  setVolume: (val: number) => void;
}

export function SettingsPopover({
  trigger,
  isOpen,
  onOpenChange,
  onOpenRules,
  turboMode,
  setTurboMode,
  maxBet,
  setMaxBet,
  volume,
  setVolume,
}: Props) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger render={trigger} />
      <PopoverContent
        side="top"
        align="start"
        sideOffset={12}
        className="w-[280px] bg-bg-primary border border-border-control/40 rounded-2xl p-4 shadow-2xl z-50 flex flex-col gap-4"
      >
        <Button
          variant="tab"
          size="none"
          onClick={() => {
            onOpenChange(false);
            onOpenRules();
          }}
          className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-brand-green-to hover:bg-brand-green-to/90 dark:hover:bg-brand-green-to/90 text-bg-primary font-outfit font-semibold text-sm transition-colors cursor-pointer"
        >
          <FileText className="w-5 h-5 text-bg-primary" />
          {GAME_SETTINGS_LABELS.gameRules}
        </Button>
        <div className="flex flex-row justify-between items-center w-full px-1">
          <span className="font-outfit font-medium text-sm text-brand-text-white">
            {GAME_SETTINGS_LABELS.turboMode}
          </span>
          <Switch checked={turboMode} onCheckedChange={setTurboMode} />
        </div>
        <div className="flex flex-row justify-between items-center w-full px-1">
          <span className="font-outfit font-medium text-sm text-brand-text-white">
            {GAME_SETTINGS_LABELS.maxBet}
          </span>
          <Switch checked={maxBet} onCheckedChange={setMaxBet} />
        </div>
        <div className="flex flex-row items-center gap-3 w-full px-1 pt-1 border-t border-border/10">
          <Volume2 className="w-5 h-5 text-brand-text-light shrink-0" />
          <Slider
            value={[volume]}
            onValueChange={(val) => {
              const first = Array.isArray(val) ? val[0] : val;
              setVolume(first ?? VOLUME_MIN);
            }}
            min={VOLUME_MIN}
            max={VOLUME_MAX}
            step={VOLUME_STEP}
            className="flex-1 [&_[data-slot='slider-range']]:bg-brand-green-to [&_[data-slot='slider-track']]:bg-surface-toggle [&_[data-slot='slider-thumb']]:bg-white [&_[data-slot='slider-thumb']]:border-border-control/40 [&_[data-slot='slider-thumb']]:w-1.5 [&_[data-slot='slider-thumb']]:h-4 [&_[data-slot='slider-thumb']]:rounded-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
