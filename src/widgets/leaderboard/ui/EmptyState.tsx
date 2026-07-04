import { cn } from '@/shared/lib/cn';
import { LEADERBOARD_LABELS } from '../model/constants';

interface Props {
  className?: string;
}

export function EmptyState({ className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full rounded-2xl border border-brand-border/10 bg-leaderboard-card-to/30 backdrop-blur-sm p-6 text-center min-h-[220px]',
        className
      )}
    >
      <h3 className="font-outfit font-bold text-xl sm:text-2xl text-brand-text-white mb-3">
        {LEADERBOARD_LABELS.EMPTY_STATE_TITLE}
      </h3>
      <p className="font-outfit text-sm sm:text-base text-brand-text-light max-w-[400px]">
        {LEADERBOARD_LABELS.EMPTY_STATE_MESSAGE}
      </p>
    </div>
  );
}
