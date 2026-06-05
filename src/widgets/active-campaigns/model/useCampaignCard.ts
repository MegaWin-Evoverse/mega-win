import { toast } from 'sonner';
import { CAMPAIGN_CONSTANTS } from '../config/constants';

interface UseCampaignCardResult {
  handleCopy: () => Promise<void>;
}

export function useCampaignCard(promoCode?: string): UseCampaignCardResult {
  const handleCopy = async () => {
    if (!promoCode) return;
    try {
      await navigator.clipboard.writeText(promoCode);
      toast.success(CAMPAIGN_CONSTANTS.TOAST_COPY_SUCCESS);
    } catch {
      toast.error(CAMPAIGN_CONSTANTS.TOAST_COPY_ERROR);
    }
  };

  return { handleCopy };
}
