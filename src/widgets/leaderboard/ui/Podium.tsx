import { PODIUM_CLASSES, PODIUM_ORDER } from '../model/constants';
import type { LeaderboardParticipant } from '../model/types';
import { PodiumCard } from './PodiumCard';

interface Props {
  top3: LeaderboardParticipant[];
}

export function Podium({ top3 }: Props) {
  const ordered = PODIUM_ORDER.map((pos) => top3.find((p) => p.position === pos)).filter(
    (p): p is LeaderboardParticipant => p !== undefined
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 xl:gap-8 w-full max-w-[1000px] mx-auto z-10 relative">
      {ordered.map((participant, idx) => (
        <PodiumCard
          key={participant.username}
          participant={participant}
          className={PODIUM_CLASSES[idx]}
        />
      ))}
    </div>
  );
}
