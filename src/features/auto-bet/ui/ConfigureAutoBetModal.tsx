'use client';
import type { ReactNode } from 'react';
import { CircleDollarSign, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/cn';
import { AUTO_BET_LABELS, AUTO_BET_MODE, type AutoBetMode } from '../model/constants';
import { useConfigureAutoBet } from '../model/useConfigureAutoBet';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfigureAutoBetModal({ isOpen, onOpenChange }: Props) {
  function handleClose() {
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-[calc(100%-2rem)] sm:w-[550px] sm:max-w-[550px] rounded-[24px] border border-border-default bg-page-bg p-10 text-brand-text-white shadow-2xl flex flex-col gap-6 select-none"
      >
        <Button
          variant="tab"
          size="none"
          onClick={handleClose}
          className="absolute top-5 right-5 flex h-6 w-6 items-center justify-center text-brand-text-light transition-colors hover:text-brand-text-white"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </Button>
        <ConfigureAutoBetForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

interface FormProps {
  onClose: () => void;
}

function ConfigureAutoBetForm({ onClose }: FormProps) {
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

interface ModeSectionProps {
  label: string;
  mode: AutoBetMode;
  increase: string;
  onModeChange: (mode: AutoBetMode) => void;
  onIncreaseChange: (value: string) => void;
}

function ModeSection({ label, mode, increase, onModeChange, onIncreaseChange }: ModeSectionProps) {
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

interface ModeToggleButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

function ModeToggleButton({ active, onClick, children }: ModeToggleButtonProps) {
  return (
    <Button
      variant="tab"
      size="none"
      onClick={onClick}
      className={cn(
        'h-7 rounded px-3 font-outfit text-xs font-semibold transition-all',
        active
          ? 'bg-gradient-to-b from-brand-green-from to-brand-green-to text-brand-dark'
          : 'bg-gradient-to-b from-auth-surface-dim to-auth-surface-light-dim text-brand-text-light'
      )}
    >
      {children}
    </Button>
  );
}

interface StopFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}

function StopField({ label, value, onValueChange }: StopFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-outfit text-xs font-semibold leading-4 text-brand-text-white">
        {label}
      </span>
      <div className="flex h-11 items-center gap-2 rounded-lg border border-border-default bg-auth-surface/25 px-3">
        <CircleDollarSign className="h-4 w-4 shrink-0 text-brand-green-to" />
        <Input
          type="number"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="h-auto flex-1 border-0 bg-transparent p-0 font-outfit text-xs font-semibold text-brand-text-light focus-visible:border-0 focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
