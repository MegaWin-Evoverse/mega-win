import type { RewardSort } from './types';

export const REWARDS_LABELS = {
  PAGE_TITLE: 'Rewards',
  PAGE_SUBTITLE: 'Explore current reward campaigns, community activations and timed offers.',
  SORT_LABEL: 'Sort by:',
  TIME_LEFT_LABEL: 'Time left:',
  TIME_DAYS: 'd',
  TIME_HOURS: 'h',
  TIME_MINUTES: 'm',
  TIME_EXPIRED: 'Expired',
  LOADING_ALT: 'Loading rewards...',
} as const;

export interface SortOption {
  value: RewardSort;
  label: string;
}

export const SORT_OPTIONS: readonly SortOption[] = [
  { value: 'createdAtDesc', label: 'By creation' },
  { value: 'endingSoon', label: 'Ending soon' },
] as const;

export const DEFAULT_SORT: RewardSort = 'createdAtDesc';

export const DEFAULT_PAGE = 1;

export const DEFAULT_TAKE = 8;

export const REWARD_CARD_IMAGE_SIZE = { width: 400, height: 260 } as const;
