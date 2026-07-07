import { useCallback } from 'react';
import { SOCIAL_AUTH_URL } from './constants';

interface UseSocialAuthResult {
  redirectToGoogleAuth: () => void;
}

export function useSocialAuth(): UseSocialAuthResult {
  const redirectToGoogleAuth = useCallback(() => {
    window.location.assign(SOCIAL_AUTH_URL.google);
  }, []);

  return { redirectToGoogleAuth };
}
