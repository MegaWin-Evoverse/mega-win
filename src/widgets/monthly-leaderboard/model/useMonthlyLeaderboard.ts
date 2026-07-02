'use client';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@/shared/api/getLeaderboard';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { formatAmount } from '@/shared/lib/formatAmount';
import type { LeaderboardParticipant } from '@/shared/api/types/leaderboard';
import {
  TOP_3_THRESHOLD,
  PODIUM_ORDER,
  PODIUM_AVATAR_SRC,
  PODIUM_RANK_ICON_SRC,
  PODIUM_CHAMP_ICON_SRC,
} from './constants';
import { getCurrentMonth } from '@/shared/lib/getCurrentMonth';
import type { LeaderCardData } from './types';

type PodiumPosition = 1 | 2 | 3;

function isPodiumPosition(pos: number): pos is PodiumPosition {
  return pos >= 1 && pos <= TOP_3_THRESHOLD;
}

function toLeaderCard(participant: LeaderboardParticipant): LeaderCardData | null {
  const pos = Number(participant.position);

  if (!isPodiumPosition(pos)) {
    return null;
  }

  return {
    id: `leader-${pos}`,
    username: participant.username,
    wageredAmount: formatAmount(Number(participant.usdWager)),
    rewardAmount: participant.prizeValue ? formatAmount(Number(participant.prizeValue)) : '',
    avatarSrc: PODIUM_AVATAR_SRC[pos],
    rankIconSrc: PODIUM_RANK_ICON_SRC[pos],
    champIconSrc: PODIUM_CHAMP_ICON_SRC[pos],
    rank: pos,
  };
}

export function useMonthlyLeaderboard() {
  const month = getCurrentMonth();

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.leaderboard(month),
    queryFn: () => getLeaderboard({ month }),
  });

  const allParticipants = data?.participants?.data ?? [];
  const top3Participants = allParticipants.filter((p) => Number(p.position) <= TOP_3_THRESHOLD);

  const cards: LeaderCardData[] = PODIUM_ORDER.map((pos) => {
    const participant = top3Participants.find((p) => Number(p.position) === pos);

    if (!participant) {
      return null;
    }

    return toLeaderCard(participant);
  }).filter((card): card is LeaderCardData => card !== null);

  const isEmpty = !isLoading && cards.length === 0;

  return { cards, isLoading, isEmpty };
}
