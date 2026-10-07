import { RISK, type Risk } from '@/entities/game';

export const RISK_LABEL = 'Risk';

export const RISK_CLASSNAMES: Record<Risk, string> = {
  [RISK.CLASSIC]: 'text-risk-classic',
  [RISK.LOW]: 'text-risk-low',
  [RISK.MEDIUM]: 'text-risk-medium',
  [RISK.HIGH]: 'text-risk-high',
};
