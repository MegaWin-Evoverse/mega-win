import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  verificationToken: string | null;
  email: string | null;
  setVerificationToken: (token: string) => void;
  setEmail: (email: string) => void;
  clearVerificationToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      verificationToken: null,
      email: null,
      setVerificationToken: (token) => set({ verificationToken: token }),
      setEmail: (email) => set({ email }),
      clearVerificationToken: () => set({ verificationToken: null, email: null }),
    }),
    { name: 'auth-storage' }
  )
);
