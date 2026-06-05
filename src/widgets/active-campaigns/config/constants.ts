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

export const CAMPAIGN_IDS = {
  FORTUNE_BONUS: 'fortune-bonus',
  MONTHLY_COMPETITION: 'monthly-competition',
} as const;

export const CAMPAIGN_CONSTANTS = {
  TOAST_COPY_SUCCESS: 'Promo code copied successfully!',
  TOAST_COPY_ERROR: 'Failed to copy promo code.',
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
    logoSrc: '/bonuses-cards/degencity.svg',
    decorations: [
      {
        src: '/bonuses-cards/gift.webp',
        width: 553,
        height: 274,
        className:
          'absolute w-[553px] h-[274px] left-[15px] bottom-0 rotate-[6.77deg] z-10 pointer-events-none select-none',
      },
      {
        src: '/bonuses-cards/chips.svg',
        width: 166,
        height: 95,
        className:
          'absolute w-[166px] h-[95px] left-[232px] bottom-0 rotate-[2deg] z-10 pointer-events-none select-none',
      },
      {
        src: '/bonuses-cards/chip.svg',
        width: 42,
        height: 90,
        className:
          'absolute w-[42px] h-[90px] right-0 top-[9px]  z-10 pointer-events-none select-none',
      },
    ],
  },
  {
    id: CAMPAIGN_IDS.MONTHLY_COMPETITION,
    variant: 'promoRed',
    subtitle: 'Monthly',
    title: 'Competition',
    endTimeString: '2d : 15h : 35m',
    decorations: [
      {
        src: '/bonuses-cards/award.webp',
        width: 280,
        height: 220,
        className:
          'absolute w-[280px] h-[220px] right-[25px] bottom-0  promo-cup-filter z-10 pointer-events-none select-none',
      },
      {
        src: '/bonuses-cards/coin-1.svg',
        width: 144,
        height: 200,
        className:
          'absolute w-[144.31px] h-[200.94px] right-[10px] top-[-10px] z-[11] pointer-events-none select-none',
      },
      {
        src: '/bonuses-cards/coin-2.svg',
        width: 106,
        height: 148,
        className:
          'absolute w-[106.89px] h-[148.83px] right-[180px] bottom-[10px] z-[11] pointer-events-none select-none',
      },
    ],
  },
] as const;
