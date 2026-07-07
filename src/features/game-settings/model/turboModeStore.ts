import { create } from 'zustand';

interface TurboModeState {
  turboMode: boolean;
  setTurboMode: (turboMode: boolean) => void;
}

const useTurboModeStoreRaw = create<TurboModeState>((set) => ({
  turboMode: false,
  setTurboMode: (turboMode) => set({ turboMode }),
}));

export function useTurboModeStore<T>(selector: (state: TurboModeState) => T): T {
  return useTurboModeStoreRaw(selector);
}
