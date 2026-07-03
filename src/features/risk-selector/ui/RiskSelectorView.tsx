'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import type { Risk, RiskOption } from '@/entities/game';
import { RISK_CLASSNAMES } from '../model/constants';

interface Props {
  risk: Risk;
  onRiskChange: (risk: Risk) => void;
  options: readonly RiskOption[];
  label: string;
  labelClassName?: string;
  className?: string;
}

export function RiskSelectorView({
  risk,
  onRiskChange,
  options,
  label,
  labelClassName,
  className,
}: Props) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <span className={cn('font-outfit', labelClassName)}>{label}</span>
      <div className="flex w-full gap-2">
        {options.map((option) => {
          const isActive = risk === option.value;
          return (
            <Button
              key={option.value}
              variant="ghost"
              size="none"
              onClick={() => onRiskChange(option.value)}
              className={cn(
                'h-11 flex-1 rounded-lg font-outfit text-base font-semibold transition-all duration-200',
                RISK_CLASSNAMES[option.value],
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
