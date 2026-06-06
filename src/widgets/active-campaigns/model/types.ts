export interface CampaignDecoration {
  src: string;
  width: number;
  height: number;
  className: string;
}

export interface CampaignCardData {
  id: string;
  variant: 'promoPurple' | 'promoRed';
  subtitle: string;
  title: string;
  promoCode?: string;
  useCodeLabel?: string;
  endTimeString: string;
  logoSrc?: string;
  decorations: readonly CampaignDecoration[];
}
