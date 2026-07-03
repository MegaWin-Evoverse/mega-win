import { useCallback } from 'react';
import { toast } from 'sonner';
import { GETTING_STARTED_CONSTANTS } from './constants';

interface UseCopyPromoCodeResult {
  handleCopy: () => Promise<void>;
}

export function useCopyPromoCode(promoCode?: string): UseCopyPromoCodeResult {
  const handleCopy = useCallback(async () => {
    if (!promoCode) return;
    try {
      await navigator.clipboard.writeText(promoCode);
      toast.success(GETTING_STARTED_CONSTANTS.TOAST_COPY_SUCCESS);
    } catch {
      toast.error(GETTING_STARTED_CONSTANTS.TOAST_COPY_ERROR);
    }
  }, [promoCode]);

  return { handleCopy };
}
