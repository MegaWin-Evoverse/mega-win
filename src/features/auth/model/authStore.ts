import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  verificationToken: string | null;
  email: string | null;
  isAuthFormOpen: boolean;
  setVerificationToken: (token: string) => void;
  setEmail: (email: string) => void;
  clearVerificationToken: () => void;
  openAuthForm: () => void;
  closeAuthForm: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      verificationToken: null,
      email: null,
      isAuthFormOpen: false,
      setVerificationToken: (token) => set({ verificationToken: token }),
      setEmail: (email) => set({ email }),
      clearVerificationToken: () => set({ verificationToken: null, email: null }),
      openAuthForm: () => set({ isAuthFormOpen: true }),
      closeAuthForm: () => set({ isAuthFormOpen: false }),
    }),
    { name: 'auth-storage' }
  )
);
