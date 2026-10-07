import { Input } from '@/shared/ui/input';
import { AUTO_BET_LABELS, AUTO_BET_MODE, type AutoBetMode } from '../model/constants';
import { ModeToggleButton } from './ModeToggleButton';

interface Props {
  label: string;
  mode: AutoBetMode;
  increase: string;
  onModeChange: (mode: AutoBetMode) => void;
  onIncreaseChange: (value: string) => void;
}

export function ModeSection({ label, mode, increase, onModeChange, onIncreaseChange }: Props) {
  const isIncrease = mode === AUTO_BET_MODE.INCREASE;

  return (
    <div className="flex flex-col gap-3">
      <span className="font-outfit text-xs font-semibold leading-4 text-brand-text-white">
        {label}
      </span>
      <div className="flex h-11 items-center justify-between rounded-lg border border-border-default bg-bg-primary px-3">
        <div className="flex gap-1">
          <ModeToggleButton active={!isIncrease} onClick={() => onModeChange(AUTO_BET_MODE.RESET)}>
            {AUTO_BET_MODE.RESET}
          </ModeToggleButton>
          <ModeToggleButton
            active={isIncrease}
            onClick={() => onModeChange(AUTO_BET_MODE.INCREASE)}
          >
            {AUTO_BET_MODE.INCREASE}
          </ModeToggleButton>
        </div>
        {isIncrease && (
          <div className="flex items-center gap-1">
            <Input
              type="number"
              value={increase}
              onChange={(e) => onIncreaseChange(e.target.value)}
              className="h-auto w-16 border-0 bg-transparent p-0 text-right font-outfit text-xs font-semibold text-brand-text-white focus-visible:border-0 focus-visible:ring-0"
            />
            <span className="font-outfit text-xs font-semibold text-brand-text-light">
              {AUTO_BET_LABELS.PERCENT_SUFFIX}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
