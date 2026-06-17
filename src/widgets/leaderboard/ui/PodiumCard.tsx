import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import { formatAmount } from '@/shared/lib/formatAmount';
import {
  LEADERBOARD_LABELS,
  LEADERBOARD_SIZES,
  PODIUM_AVATAR_SRC,
  PODIUM_RANK_ICON_SRC,
  PODIUM_CHAMP_ICON_SRC,
} from '../model/constants';
import type { LeaderboardParticipant } from '../model/types';

interface Props {
  participant: LeaderboardParticipant;
  className?: string;
}

export function PodiumCard({ participant, className }: Props) {
  const { username, usdWager, prizeValue, position } = participant;
  const pos = position as 1 | 2 | 3;
  const isFirst = pos === 1;

  return (
    <div
      className={cn(
        'w-full max-w-[340px] sm:max-w-none sm:w-[220px] md:w-[245px] xl:w-[280px] h-[340px] rounded-[18px] p-4 sm:p-6 flex flex-col items-center justify-start gap-4 border border-brand-border/10 select-none relative',
        isFirst
          ? 'bg-gradient-to-b from-leaderboard-bg-from to-leaderboard-card-rank1-to leaderboard-card-rank1-shadow border-leaderboard-accent/30'
          : 'bg-gradient-to-b from-leaderboard-bg-from to-leaderboard-card-to',
        className
      )}
    >
      <div className="relative w-[100px] h-[100px] shrink-0">
        <div className="absolute inset-0 rounded-full leaderboard-avatar-ring p-[3px] border border-leaderboard-accent/20">
          <Image
            src={PODIUM_AVATAR_SRC[pos]}
            alt={username}
            width={LEADERBOARD_SIZES.AVATAR}
            height={LEADERBOARD_SIZES.AVATAR}
            className="rounded-full object-cover w-full h-full"
            priority
          />
        </div>
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[60px] h-[60px] z-10">
          <Image
            src={PODIUM_RANK_ICON_SRC[pos]}
            alt={`Rank ${pos}`}
            width={LEADERBOARD_SIZES.RANK_ICON}
            height={LEADERBOARD_SIZES.RANK_ICON}
            className="object-contain"
            priority
          />
        </div>
      </div>
      <h4 className="font-outfit font-semibold text-2xl text-brand-text-white tracking-tight truncate w-full text-center mt-2">
        {username}
      </h4>
      <div className="flex flex-col items-center gap-1 w-full">
        <span className="font-outfit font-light text-sm text-brand-text-light uppercase tracking-wider">
          {LEADERBOARD_LABELS.WAGERED}
        </span>
        <div className="flex items-center justify-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-leaderboard-dollar text-brand-text-white flex items-center justify-center font-bold text-xs select-none">
            $
          </span>
          <span className="font-outfit font-semibold text-xl text-brand-text-white">
            {formatAmount(Number(usdWager))}
          </span>
        </div>
      </div>
      {prizeValue && (
        <div className="w-full max-w-[202px] h-[64px] bg-leaderboard-reward-bg border border-brand-border/10 rounded-xl flex items-center justify-center gap-2 px-4 py-2 mt-auto">
          <Image
            src={PODIUM_CHAMP_ICON_SRC[pos]}
            alt="Prize trophy"
            width={LEADERBOARD_SIZES.CHAMP_ICON}
            height={LEADERBOARD_SIZES.CHAMP_ICON}
            className="object-contain"
            priority
          />
          <span className="font-outfit font-semibold text-2xl text-brand-text-white">
            {formatAmount(Number(prizeValue))}
          </span>
        </div>
      )}
    </div>
  );
}
