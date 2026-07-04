import type { FAQItem } from './types';
import askIcon from '../assets/icons/ask.svg';

export const FAQ_CONSTANTS = {
  SECTION_TITLE: 'Frequently asked questions',
  SECTION_ARIA_LABEL: 'Frequently asked questions',
  ICON_SRC: askIcon,
  ICON_WIDTH: 24,
  ICON_HEIGHT: 24,
} as const;

export const FAQ_ITEMS: readonly FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What are rewards?',
    answer:
      'Rewards are limited-time campaigns, bonuses, and giveaways from Mega Win for the community. Each card on this page is a separate campaign with its own terms and prizes.',
  },
  {
    id: 'faq-2',
    question: 'How do I claim a reward?',
    answer:
      'Open the reward card to see the full campaign details and terms, then follow the action button. Depending on the campaign, it can take you to DegenCity, Discord, or another official destination to complete the claim.',
  },
  {
    id: 'faq-3',
    question: 'Who can participate?',
    answer:
      'Most rewards require a DegenCity account registered under code MEGAWIN and a linked Discord. Each campaign lists its own conditions, and entries go through eligibility checks before fulfillment.',
  },
  {
    id: 'faq-4',
    question: 'How long do rewards stay active?',
    answer:
      'Rewards with an end date show a countdown timer — claim them before it runs out. Rewards without a timer stay active until they are updated or hidden.',
  },
  {
    id: 'faq-5',
    question: 'What happens when a reward expires?',
    answer:
      'Expired rewards are removed from the list and can no longer be claimed, but new campaigns appear regularly — check back or follow announcements in Discord.',
  },
] as const;
