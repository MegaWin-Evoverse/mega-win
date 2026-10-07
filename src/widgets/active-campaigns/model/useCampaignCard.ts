import { useCallback } from 'react';
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';
import { CLIPBOARD_MESSAGES, COPY_ICON_RESET_MS } from '@/shared/config';

interface UseCampaignCardResult {
  handleCopy: () => Promise<void>;
  isCopied: boolean;
}

export function useCampaignCard(promoCode?: string): UseCampaignCardResult {
  const { copiedKey, copy } = useCopyToClipboard({
    successMessage: CLIPBOARD_MESSAGES.PROMO_COPY_SUCCESS,
    errorMessage: CLIPBOARD_MESSAGES.PROMO_COPY_ERROR,
    resetMs: COPY_ICON_RESET_MS,
  });

  const handleCopy = useCallback(async () => {
    if (!promoCode) return;
    await copy(promoCode, promoCode);
  }, [promoCode, copy]);

  return { handleCopy, isCopied: copiedKey === promoCode };
}
