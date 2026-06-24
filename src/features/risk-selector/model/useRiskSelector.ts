import { useShallow } from 'zustand/react/shallow';
import { type Risk, useGameControlsStore } from '@/entities/game';

interface UseRiskSelectorReturn {
  risk: Risk;
  setRisk: (risk: Risk) => void;
}

export function useRiskSelector(): UseRiskSelectorReturn {
  return useGameControlsStore(
    useShallow((state) => ({ risk: state.risk, setRisk: state.setRisk }))
  );
}
