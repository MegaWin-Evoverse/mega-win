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

export interface LeaderboardParticipantsPage {
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
