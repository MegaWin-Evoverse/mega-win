import type { LeaderboardParticipant } from '@/shared/api/types/leaderboard';

export type PodiumPosition = 1 | 2 | 3;

export interface PodiumParticipant extends Omit<LeaderboardParticipant, 'position'> {
  position: PodiumPosition;
}

export interface CountdownValues {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface RulesItem {
  id: string;
  question: string;
  answer: string;
}
