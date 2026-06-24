'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { PLINKO_RISK_OPTIONS, RISK, type Risk } from '@/entities/game';
import { FAIRNESS_LABELS } from '../model/constants';

interface Props {
  risk: Risk;
  onRiskChange: (risk: Risk) => void;
  className?: string;
}

const RISK_CLASSNAMES: Record<Risk, string> = {
  [RISK.CLASSIC]: 'text-risk-classic',
  [RISK.LOW]: 'text-risk-low',
  [RISK.MEDIUM]: 'text-risk-medium',
  [RISK.HIGH]: 'text-risk-high',
};

export function VerifyRiskSelector({ risk, onRiskChange, className }: Props) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <span className="font-outfit text-sm font-light text-brand-text-light select-none">
        {FAIRNESS_LABELS.fieldRisk}
      </span>
      <div className="flex w-full gap-2">
        {PLINKO_RISK_OPTIONS.map((option) => {
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
