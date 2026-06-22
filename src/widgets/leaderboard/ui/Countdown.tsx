'use client';
import { useCountdown } from '../model/useCountdown';
import { COUNTDOWN_UNITS, LEADERBOARD_LABELS } from '../model/constants';

interface Props {
  endDate: Date;
}

export function Countdown({ endDate }: Props) {
  const countdown = useCountdown(endDate);

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-outfit text-sm text-brand-text-light">
        {LEADERBOARD_LABELS.COUNTDOWN_TITLE}
      </span>
      <div className="flex items-center gap-3">
        {COUNTDOWN_UNITS.map(({ key, label }) => (
          <div key={key} className="flex flex-col items-center gap-1">
            <div className="w-[56px] h-[52px] bg-leaderboard-reward-bg border border-brand-border/10 rounded-lg flex items-center justify-center">
              <span className="font-outfit font-bold text-2xl text-brand-text-white">
                {countdown[key]}
              </span>
            </div>
            <span className="font-outfit text-xs text-brand-text-light">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
