import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_SOUND_VOLUME = 75;

interface SoundStore {
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (vol: number) => void;
}

export const useSoundStore = create<SoundStore>()(
  persist(
    (set) => ({
      isMuted: false,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      volume: DEFAULT_SOUND_VOLUME,
      setVolume: (vol) => set({ volume: vol }),
    }),
    { name: 'crash-game-sound' }
  )
);
