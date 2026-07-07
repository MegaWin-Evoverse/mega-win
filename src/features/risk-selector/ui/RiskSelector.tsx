'use client';
import type { RiskOption } from '@/entities/game';
import { RISK_LABEL } from '../model/constants';
import { useRiskSelector } from '../model/useRiskSelector';
import { RiskSelectorView } from './RiskSelectorView';

interface Props {
  options: readonly RiskOption[];
  className?: string;
}

export function RiskSelector({ options, className }: Props) {
  const { risk, setRisk } = useRiskSelector();

  return (
    <RiskSelectorView
      risk={risk}
      onRiskChange={setRisk}
      options={options}
      label={RISK_LABEL}
      labelClassName="text-base font-medium text-brand-text-white"
      className={className}
    />
  );
}
