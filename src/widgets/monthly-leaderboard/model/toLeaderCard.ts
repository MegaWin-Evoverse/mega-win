import { formatAmount } from '@/shared/lib/formatAmount';
import type { LeaderboardParticipant } from '@/shared/api/types/leaderboard';
import {
  TOP_3_THRESHOLD,
  PODIUM_AVATAR_SRC,
  PODIUM_RANK_ICON_SRC,
  PODIUM_CHAMP_ICON_SRC,
  LEADERBOARD_CARD_ID_PREFIX,
} from './constants';
import type { LeaderCardData } from './types';

type PodiumPosition = 1 | 2 | 3;

function isPodiumPosition(pos: number): pos is PodiumPosition {
  return pos >= 1 && pos <= TOP_3_THRESHOLD;
}

export function toLeaderCard(participant: LeaderboardParticipant): LeaderCardData | null {
  const pos = Number(participant.position);

  if (!isPodiumPosition(pos)) {
    return null;
  }

  return {
    id: `${LEADERBOARD_CARD_ID_PREFIX}${pos}`,
    username: participant.username,
    wageredAmount: formatAmount(Number(participant.usdWager)),
    rewardAmount: participant.prizeValue ? formatAmount(Number(participant.prizeValue)) : '',
    avatarSrc: PODIUM_AVATAR_SRC[pos],
    rankIconSrc: PODIUM_RANK_ICON_SRC[pos],
    champIconSrc: PODIUM_CHAMP_ICON_SRC[pos],
    rank: pos,
  };
}
