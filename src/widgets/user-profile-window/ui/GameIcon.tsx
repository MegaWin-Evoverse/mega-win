import type { ComponentProps } from 'react';
import { Crown, Dices } from 'lucide-react';
import type { GameIconName } from '../model/types';

interface Props extends ComponentProps<'svg'> {
  name: GameIconName;
}

export function GameIcon({ name, className, ...props }: Props) {
  if (name === 'winners') return <Crown className={className} size={16} />;

  if (name === 'dice') return <Dices className={className} size={16} />;

  if (name === 'roulette') {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
      </svg>
    );
  }

  if (name === 'keno') {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        <rect x="3" y="9" width="12" height="12" rx="2" ry="2" />
        <path d="M9 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      </svg>
    );
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <circle cx="12" cy="7" r="2.5" />
      <circle cx="7" cy="16" r="2.5" />
      <circle cx="17" cy="16" r="2.5" />
    </svg>
  );
}
