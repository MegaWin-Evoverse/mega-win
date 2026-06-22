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
    question: 'How do I participate in the leaderboard?',
    answer:
      'Create a DegenCity account using our promo code, connect your Discord, and participate in daily and weekly activities to climb the rankings.',
  },
  {
    id: 'faq-2',
    question: 'When are the weekly giveaways announced?',
    answer:
      'All giveaways and promotional events are posted in our Discord server under the Announcements and Giveaways channels.',
  },
  {
    id: 'faq-3',
    question: 'How often is the leaderboard updated?',
    answer:
      'The monthly leaderboard is updated in real-time, allowing you to track your rank and potential rewards instantly.',
  },
  {
    id: 'faq-4',
    question: 'Can I use multiple accounts to claim rewards?',
    answer:
      'No, users are restricted to one account per person. Any attempt to use multiple accounts will result in disqualification from all promotions.',
  },
  {
    id: 'faq-5',
    question: 'How do I claim my tournament rewards?',
    answer:
      'Tournament rewards are automatically credited to your connected account within 24 hours of the tournament completion.',
  },
] as const;
