'use client';
import { DialogTitle } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { AUTO_BET_LABELS } from '../model/constants';
import { useConfigureAutoBet } from '../model/useConfigureAutoBet';
import { ModeSection } from './ModeSection';
import { StopField } from './StopField';

interface Props {
  onClose: () => void;
}

export function ConfigureAutoBetForm({ onClose }: Props) {
  const {
    onWinMode,
    onWinIncrease,
    onLossMode,
    onLossIncrease,
    stopOnProfit,
    stopOnLoss,
    setOnWinMode,
    setOnWinIncrease,
    setOnLossMode,
    setOnLossIncrease,
    setStopOnProfit,
    setStopOnLoss,
    handleApply,
    handleResetAll,
  } = useConfigureAutoBet(onClose);

  return (
    <>
      <DialogTitle className="w-full text-center font-outfit text-xl font-semibold leading-6 text-brand-text-white">
        {AUTO_BET_LABELS.CONFIGURE_TITLE}
      </DialogTitle>
      <div className="flex flex-col gap-4">
        <ModeSection
          label={AUTO_BET_LABELS.ON_WIN}
          mode={onWinMode}
          increase={onWinIncrease}
          onModeChange={setOnWinMode}
          onIncreaseChange={setOnWinIncrease}
        />
        <ModeSection
          label={AUTO_BET_LABELS.ON_LOSS}
          mode={onLossMode}
          increase={onLossIncrease}
          onModeChange={setOnLossMode}
          onIncreaseChange={setOnLossIncrease}
        />
        <StopField
          label={AUTO_BET_LABELS.STOP_ON_PROFIT}
          value={stopOnProfit}
          onValueChange={setStopOnProfit}
        />
        <StopField
          label={AUTO_BET_LABELS.STOP_ON_LOSS}
          value={stopOnLoss}
          onValueChange={setStopOnLoss}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Button variant="main" size="play" onClick={handleApply}>
          {AUTO_BET_LABELS.APPLY}
        </Button>
        <Button
          variant="neutral"
          size="none"
          onClick={handleResetAll}
          className="h-12 w-full rounded-lg px-6 font-outfit text-base font-medium"
        >
          {AUTO_BET_LABELS.RESET_ALL}
        </Button>
      </div>
    </>
  );
}
