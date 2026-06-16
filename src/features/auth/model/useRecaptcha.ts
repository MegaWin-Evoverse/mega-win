import { useCallback, useState } from 'react';

export function useRecaptcha() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0);

  const resetRecaptcha = useCallback(() => {
    setRecaptchaKey((prevKey) => prevKey + 1);
    setRecaptchaToken(null);
  }, []);

  return { recaptchaToken, setRecaptchaToken, recaptchaKey, resetRecaptcha };
}
