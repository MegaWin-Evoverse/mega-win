export interface CampaignCardData {
  id: string;
  variant: 'promoPurple' | 'promoRed';
  subtitle: string;
  title: string;
  promoCode?: string;
  useCodeLabel?: string;
  endTimeString: string;
  logoSrc?: string;
  bgImageSrc: string;
}

export const CAMPAIGN_IDS = {
  FORTUNE_BONUS: 'fortune-bonus',
  MONTHLY_COMPETITION: 'monthly-competition',
} as const;

export const CAMPAIGN_CONSTANTS = {
  CLOCK_ICON_ALT: 'Remaining time clock icon',
  COPY_ICON_ALT: 'Copy promo code to clipboard',
  LOGO_ALT: 'Degencity Logo',
  SECTION_ARIA_LABEL: 'Active campaigns and promotions',
  IMAGE_DECORATION_ALT: 'Decoration image',
  SPLIT_DELIMITER: ' ',
  COLON_CHAR: ':',
} as const;

export const CAMPAIGN_CARDS: readonly CampaignCardData[] = [
  {
    id: CAMPAIGN_IDS.FORTUNE_BONUS,
    variant: 'promoPurple',
    subtitle: 'Get 5%',
    title: 'Fortune Bonus',
    promoCode: 'MEGAWIN',
    useCodeLabel: 'Use code:',
    endTimeString: '2d : 15h : 35m',
    bgImageSrc: '/bonuses-cards/fortune-bg.webp',
  },
  {
    id: CAMPAIGN_IDS.MONTHLY_COMPETITION,
    variant: 'promoRed',
    subtitle: 'Monthly',
    title: 'Competition',
    endTimeString: '2d : 15h : 35m',
    bgImageSrc: '/bonuses-cards/competition-bg.webp',
  },
] as const;
