import { cn } from '@/shared/lib/cn';
import type { RollEntry } from '../model/types';
import { ROLL_DECIMALS } from '../model/constants';

interface Props {
  history: RollEntry[];
}

export function History({ history }: Props) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {history.map((entry, i) => (
        <div
          key={i}
          className={cn(
            'flex h-8 w-12 items-center justify-center rounded-[6px] font-outfit text-xs font-semibold',
            entry.isWin
              ? 'bg-brand-green-to text-brand-dark'
              : 'bg-gradient-to-b from-brand-border to-brand-btn-gradient-to text-brand-text-white'
          )}
        >
          {entry.value.toFixed(ROLL_DECIMALS)}
        </div>
      ))}
    </div>
  );
}
