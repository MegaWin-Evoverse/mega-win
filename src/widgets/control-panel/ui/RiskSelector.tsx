'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { CONTROL_PANEL_LABELS, type Risk, type RiskOption } from '../model/constants';

interface Props {
  options: readonly RiskOption[];
  risk: Risk;
  onRiskSelect: (risk: Risk) => void;
  className?: string;
}

export function RiskSelector({ options, risk, onRiskSelect, className }: Props) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <span className="font-outfit text-base font-medium text-brand-text-white">
        {CONTROL_PANEL_LABELS.RISK}
      </span>
      <div className="flex w-full gap-2">
        {options.map((option) => {
          const isActive = risk === option.value;
          return (
            <Button
              key={option.value}
              variant="ghost"
              size="none"
              onClick={() => onRiskSelect(option.value)}
              className={cn(
                'h-11 flex-1 rounded-lg font-outfit text-base font-semibold transition-all duration-200',
                option.className,
                isActive
                  ? 'game-tab-active border border-border-default/50 shadow-sm'
                  : 'bg-transparent border border-transparent hover:bg-surface-inset/25'
              )}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
