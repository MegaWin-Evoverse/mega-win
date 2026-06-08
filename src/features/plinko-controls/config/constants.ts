export const PLINKO_RISK = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export type PlinkoRisk = (typeof PLINKO_RISK)[keyof typeof PLINKO_RISK];

export const PLINKO_RISK_OPTIONS = [
  { value: PLINKO_RISK.LOW, label: 'Low', className: 'text-risk-low' },
  { value: PLINKO_RISK.MEDIUM, label: 'Medium', className: 'text-risk-medium' },
  { value: PLINKO_RISK.HIGH, label: 'High', className: 'text-risk-high' },
] as const;

export const PLINKO_ROWS = {
  MIN: 8,
  MAX: 16,
  DEFAULT: 8,
  STEP: 1,
} as const;

export const PLINKO_LABELS = {
  RISK: 'Risk',
  ROWS: 'Rows',
} as const;
