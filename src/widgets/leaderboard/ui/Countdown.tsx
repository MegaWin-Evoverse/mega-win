'use client';
import { Fragment, useEffect, useState } from 'react';
import { useCountdown } from '../model/useCountdown';
import { COUNTDOWN_UNITS, LEADERBOARD_LABELS } from '../model/constants';

interface Props {
  endDate: Date;
}

export function Countdown({ endDate }: Props) {
  const countdown = useCountdown(endDate);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 w-full max-w-72 rounded-[18px] bg-gradient-to-b from-auth-surface-dim to-auth-surface-light-dim">
      <span className="font-outfit font-semibold text-base leading-5 text-brand-text-white">
        {LEADERBOARD_LABELS.COUNTDOWN_TITLE}
      </span>
      <div className="flex items-center gap-2">
        {COUNTDOWN_UNITS.map(({ key, label }, index) => (
          <Fragment key={key}>
            {index > 0 && (
              <span className="font-outfit font-semibold text-xs leading-4 text-brand-text-muted self-center">
                :
              </span>
            )}
            <div className="flex flex-col items-center justify-center px-4 py-2 gap-1 bg-leaderboard-reward-bg rounded-lg">
              <span className="font-outfit font-semibold text-sm leading-[18px] text-brand-text-white">
                {mounted ? countdown[key] : '00'}
              </span>
              <span className="font-outfit font-semibold text-xs leading-4 text-brand-text-muted">
                {label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
