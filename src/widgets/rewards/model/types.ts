export interface Reward {
  id: string;
  title: string;
  shortDescription: string;
  photoUrl: string;
  endDate: string;
}

export interface RewardsPage {
  take: number;
  page: number;
  total: number;
  totalPages: number;
  data: Reward[];
}

export type RewardSort = 'createdAtDesc' | 'createdAtAsc' | 'endingSoon';
