import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AUTH_TAB_DEFAULT } from './constants';
import type { AuthType } from './types';

interface AuthState {
  verificationToken: string | null;
  email: string | null;
  isAuthFormOpen: boolean;
  isForgotPasswordOpen: boolean;
  authTab: AuthType;
  setVerificationToken: (token: string) => void;
  setEmail: (email: string) => void;
  clearVerificationToken: () => void;
  setAuthTab: (tab: AuthType) => void;
  openAuthForm: (tab?: AuthType) => void;
  closeAuthForm: () => void;
  openForgotPassword: () => void;
  closeForgotPassword: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      verificationToken: null,
      email: null,
      isAuthFormOpen: false,
      isForgotPasswordOpen: false,
      authTab: AUTH_TAB_DEFAULT,
      setVerificationToken: (token) => set({ verificationToken: token }),
      setEmail: (email) => set({ email }),
      clearVerificationToken: () => set({ verificationToken: null, email: null }),
      setAuthTab: (tab) => set({ authTab: tab }),
      openAuthForm: (tab) => set({ isAuthFormOpen: true, authTab: tab ?? AUTH_TAB_DEFAULT }),
      closeAuthForm: () => set({ isAuthFormOpen: false, isForgotPasswordOpen: false }),
      openForgotPassword: () => set({ isForgotPasswordOpen: true }),
      closeForgotPassword: () => set({ isForgotPasswordOpen: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ email: state.email }),
    }
  )
);
