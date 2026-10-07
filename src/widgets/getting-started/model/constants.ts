import { EXTERNAL_LINKS } from '@/shared/config';
import type { StepCardData } from './types';

export const GETTING_STARTED_CONSTANTS = {
  SECTION_TITLE: 'How to get started?',
  SECTION_ARIA_LABEL: 'How to get started',
  COPY_ICON_ALT: 'Copy promo code to clipboard',
  DECORATION_ALT: '',
} as const;

export const STEP_ACTION_TYPE = {
  EXTERNAL_LINK: 'external-link',
  CONNECT_ACCOUNT: 'connect-account',
} as const;

export const GETTING_STARTED_STEPS: readonly StepCardData[] = [
  {
    id: 'degencity-account',
    mediaVariant: 'degencity',
    title: 'Create your DegenCity account',
    leadText: 'Register on DegenCity using promo our code:',
    promoCode: 'MEGAWIN',
    promoNote: 'Please clear your browser cache and/or cookies before creating your account.',
    buttonLabel: 'Register',
    action: { type: STEP_ACTION_TYPE.EXTERNAL_LINK, href: EXTERNAL_LINKS.DEGENCITY },
    decorations: [
      {
        src: '/getting-started/degencity-art.svg',
        width: 303,
        height: 378,
        className: 'absolute right-0 bottom-0 z-0 pointer-events-none select-none',
      },
      {
        src: '/getting-started/degencity-coin-1.svg',
        width: 70,
        height: 70,
        className: 'absolute left-0 bottom-0 z-10 pointer-events-none select-none',
      },
      {
        src: '/getting-started/degencity-coin-2.svg',
        width: 100,
        height: 100,
        className: 'absolute right-0 top-[6px] z-10 pointer-events-none select-none',
      },
    ],
  },
  {
    id: 'discord',
    mediaVariant: 'discord',
    title: 'Join MEGA WIN’s Discord',
    leadText: 'Make sure you’re Super Confirmed to be eligible.',
    description: [
      { text: 'Weekly giveaways and promotions are posted in Discord under ' },
      { text: 'Giveaways', accent: true },
      { text: ' and ' },
      { text: 'Announcements', accent: true },
    ],
    buttonLabel: 'Join Discord',
    action: { type: STEP_ACTION_TYPE.EXTERNAL_LINK, href: EXTERNAL_LINKS.DISCORD },
    decorations: [
      {
        src: '/getting-started/discord-home.webp',
        width: 573,
        height: 280,
        className:
          'absolute left-[calc(50%-154px)] top-0 blur-[2px] z-0 pointer-events-none select-none',
      },
      {
        src: '/getting-started/discord-blur.svg',
        width: 155,
        height: 135,
        className:
          'absolute left-[-38px] top-[-40px] blur-[3.15px] [transform:matrix(-0.1,1,1,0.1,0,0)] z-0 pointer-events-none select-none',
      },
      {
        src: '/getting-started/discord-3.webp',
        width: 170,
        height: 170,
        className: 'absolute left-0 bottom-0 z-10 pointer-events-none select-none',
      },
      {
        src: '/getting-started/discord-logo-2.svg',
        width: 99,
        height: 99,
        className: 'absolute left-[calc(50%+30px)] top-0 z-10 pointer-events-none select-none',
      },
    ],
  },
  {
    id: 'connect-account',
    mediaVariant: 'connect',
    title: 'Connect your account',
    description: [
      { text: 'Link your Discord to your ' },
      { text: 'megawin.com', accent: true },
      { text: ' profile' },
    ],
    buttonLabel: 'Connect Account',
    action: { type: STEP_ACTION_TYPE.CONNECT_ACCOUNT },
    decorations: [
      {
        src: '/getting-started/connect-art-1.svg',
        width: 174,
        height: 174,
        className: 'absolute left-[calc(50%-30px)] bottom-0 z-10 pointer-events-none select-none',
      },
      {
        src: '/getting-started/connect-art-2.svg',
        width: 153,
        height: 153,
        className: 'absolute left-0 bottom-0 z-10 pointer-events-none select-none',
      },
      {
        src: '/getting-started/connect-art-3.svg',
        width: 103,
        height: 103,
        className: 'absolute right-0 top-0 z-10 pointer-events-none select-none',
      },
      {
        src: '/getting-started/discord-logo-1.svg',
        width: 103,
        height: 103,
        className:
          'absolute left-[calc(50%-95px)] top-[-25px] rotate-[-30deg] z-10 pointer-events-none select-none',
      },
    ],
  },
] as const;
