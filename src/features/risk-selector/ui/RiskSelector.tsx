'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import type { RiskOption } from '@/entities/game';
import { RISK_LABEL, RISK_CLASSNAMES } from '../model/constants';
import { useRiskSelector } from '../model/useRiskSelector';

interface Props {
  options: readonly RiskOption[];
  className?: string;
}

export function RiskSelector({ options, className }: Props) {
  const { risk, setRisk } = useRiskSelector();

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <span className="font-outfit text-base font-medium text-brand-text-white">{RISK_LABEL}</span>
      <div className="flex w-full gap-2">
        {options.map((option) => {
          const isActive = risk === option.value;
          return (
            <Button
              key={option.value}
              variant="ghost"
              size="none"
              onClick={() => setRisk(option.value)}
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
