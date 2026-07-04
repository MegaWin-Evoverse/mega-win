import type { RulesItem } from './types';
import askIcon from '../assets/icons/ask.svg';

export const LEADERBOARD_LABELS = {
  TITLE: "The Mega Win's End of Month Bonus Buy Competition!",
  SUBTITLE: 'Be a Top 1000 player in January and win a live Bonus Buy with Mega Win',
  WAGERED: 'WAGERED',
  JOIN_BUTTON: 'Join the leaderboard',
  SHOW_MORE_BUTTON: 'Show more',
  COUNTDOWN_TITLE: 'Competition ends in:',
  INFO_PRE: 'Only registered and',
  INFO_BOLD: 'Super Confirmed',
  INFO_MID: 'players wagering with code',
  INFO_CODE: 'MEGAWIN',
  INFO_END: 'are ranked',
  COL_RANK: 'Rank',
  COL_USERNAME: 'Username',
  COL_WAGERED: 'Wagered',
  COL_PRIZE: 'Prize',
  COUNTDOWN_D: 'D',
  COUNTDOWN_H: 'H',
  COUNTDOWN_M: 'M',
  COUNTDOWN_S: 'S',
  NO_PRIZE: '—',
  EMPTY_STATE_TITLE: 'No participants yet',
  EMPTY_STATE_MESSAGE: 'Be the first to join the competition and claim the top spot!',
} as const;

export const PODIUM_ORDER = [2, 1, 3] as const;

export const DEFAULT_AVATAR_SRC = '/monthly-leaderboard/avatar-1.webp';

export const PODIUM_AVATAR_SRC: Record<1 | 2 | 3, string> = {
  1: '/monthly-leaderboard/avatar-1.webp',
  2: '/monthly-leaderboard/avatar-2.webp',
  3: '/monthly-leaderboard/avatar-3.webp',
};

export const PODIUM_RANK_ICON_SRC: Record<1 | 2 | 3, string> = {
  1: '/monthly-leaderboard/rank-1.webp',
  2: '/monthly-leaderboard/rank-2.webp',
  3: '/monthly-leaderboard/rank-3.webp',
};

export const PODIUM_CHAMP_ICON_SRC: Record<1 | 2 | 3, string> = {
  1: '/monthly-leaderboard/champ-1.svg',
  2: '/monthly-leaderboard/champ-2.svg',
  3: '/monthly-leaderboard/champ-3.svg',
};

export const LEADERBOARD_SIZES = {
  AVATAR: 94,
  RANK_ICON: 60,
  CHAMP_ICON: 24,
  COIN_ICON: 18,
  TABLE_AVATAR: 24,
} as const;

export const INITIAL_VISIBLE_ROWS = 10;

export const ROWS_PER_LOAD = 10;

export const TOP_3_THRESHOLD = 3;

export const PODIUM_SKELETON_COUNT = 3;

export const COUNTDOWN_PLACEHOLDER = '00';

export const COUNTDOWN_UNITS = [
  { key: 'days', label: LEADERBOARD_LABELS.COUNTDOWN_D },
  { key: 'hours', label: LEADERBOARD_LABELS.COUNTDOWN_H },
  { key: 'minutes', label: LEADERBOARD_LABELS.COUNTDOWN_M },
  { key: 'seconds', label: LEADERBOARD_LABELS.COUNTDOWN_S },
] as const;

export const PODIUM_CLASSES = [
  'order-2 sm:order-1 sm:translate-y-2',
  'order-1 sm:order-2 sm:-translate-y-6 z-20',
  'order-3 sm:order-3 sm:translate-y-4',
] as const;

export const COMPETITION_RULES_CONSTANTS = {
  SECTION_TITLE: 'Competition Rules & Eligibility',
  SECTION_ARIA_LABEL: 'Competition rules and eligibility',
  ICON_SRC: askIcon,
  ICON_WIDTH: 24,
  ICON_HEIGHT: 24,
} as const;

export const COMPETITION_RULES_ITEMS: readonly RulesItem[] = [
  {
    id: 'rule-1',
    question: 'How does the Leaderboard work?',
    answer:
      'Players are ranked by their total wagered amount on DegenCity under code MEGAWIN during the current month. The leaderboard resets at the end of each month (UTC), and the top players win prizes, including a live Bonus Buy with Mega Win.',
  },
  {
    id: 'rule-2',
    question: 'Who is eligible?',
    answer:
      'Only registered players wagering with code MEGAWIN are ranked. Make sure your DegenCity and Discord accounts are connected on your megawin.com profile.',
  },
  {
    id: 'rule-3',
    question: 'Which wagers count?',
    answer:
      'Only qualifying wagers placed during the active period count toward leaderboard placement. Voided, refunded, or suspicious activity may be excluded from final results.',
  },
  {
    id: 'rule-4',
    question: 'When are winners announced?',
    answer:
      'Results are finalized after the monthly period ends and the countdown reaches zero. Past winners are listed on the Bonus by Monthly Winners page, and announcements are posted in Discord.',
  },
  {
    id: 'rule-5',
    question: 'How are prizes paid out?',
    answer:
      'Prize details are shown on the leaderboard page or announced through official Mega Win channels. Winners may need to complete verification or follow claim instructions before prizes are sent.',
  },
  {
    id: 'rule-6',
    question: 'What should I do if my leaderboard position looks wrong?',
    answer:
      'First, wait for the next leaderboard update because data may not be real-time. If the issue remains, contact Mega Win support or the official Discord with your username and relevant campaign details so the team can review it.',
  },
] as const;

export const LEADERBOARD_BG_SRC = '/leaderboard/background.png';
export const PODIUM_CHIPS_SRC = '/monthly-leaderboard/chips.svg';
export const PODIUM_ROCKET_SRC = '/monthly-leaderboard/rocket.svg';

export const LEADERBOARD_DECOR_SIZES = {
  CHIPS_WIDTH: 150,
  CHIPS_HEIGHT: 280,
  ROCKET_WIDTH: 250,
  ROCKET_HEIGHT: 310,
} as const;
