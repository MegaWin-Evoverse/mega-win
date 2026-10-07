export type PodiumPosition = 1 | 2 | 3;

export interface PodiumParticipant extends Omit<LeaderboardParticipant, 'position'> {
  position: PodiumPosition;
}

export interface LeaderboardParticipant {
  month: string;
  username: string;
  prizeValue?: string;
  prizeType?: string;
  position: number;
  usdWager: string;
  updatedAt: string;
  createdAt: string;
}

interface LeaderboardParticipantsPage {
  take: number;
  page: number;
  total: number;
  totalPages: number;
  data: LeaderboardParticipant[];
}

export interface LeaderboardData {
  month: string;
  title: string;
  updatedAt: string;
  participants: LeaderboardParticipantsPage;
}
