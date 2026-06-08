import { useCallback, useState } from 'react';

import { PLINKO_RISK, PLINKO_ROWS, type PlinkoRisk } from '../config/constants';

interface UsePlinkoControlsResult {
  risk: PlinkoRisk;
  rows: number;
  onRiskChange: (risk: PlinkoRisk) => void;
  onRowsChange: (rows: number) => void;
}

export function usePlinkoControls(): UsePlinkoControlsResult {
  const [risk, setRisk] = useState<PlinkoRisk>(PLINKO_RISK.LOW);
  const [rows, setRows] = useState<number>(PLINKO_ROWS.DEFAULT);

  const onRiskChange = useCallback((value: PlinkoRisk) => setRisk(value), []);
  const onRowsChange = useCallback((value: number) => setRows(value), []);

  return { risk, rows, onRiskChange, onRowsChange };
}
