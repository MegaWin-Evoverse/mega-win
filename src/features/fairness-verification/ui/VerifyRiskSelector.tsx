'use client';
import { PLINKO_RISK_OPTIONS, type Risk, type RiskOption } from '@/entities/game';
import { RiskSelectorView } from '@/features/risk-selector';
import { FAIRNESS_LABELS } from '../model/constants';

interface Props {
  risk: Risk;
  onRiskChange: (risk: Risk) => void;
  options?: readonly RiskOption[];
  className?: string;
}

export function VerifyRiskSelector({
  risk,
  onRiskChange,
  options = PLINKO_RISK_OPTIONS,
  className,
}: Props) {
  return (
    <RiskSelectorView
      risk={risk}
      onRiskChange={onRiskChange}
      options={options}
      label={FAIRNESS_LABELS.fieldRisk}
      labelClassName="text-sm font-light text-brand-text-light select-none"
      className={className}
    />
  );
}
