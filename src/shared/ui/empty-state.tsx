import { cn } from '@/shared/lib/cn';

const DEFAULT_TITLE = 'No participants yet';
const DEFAULT_MESSAGE = 'Be the first to join the competition and claim the top spot!';

interface Props {
  title?: string;
  message?: string;
  className?: string;
}

export function EmptyState({ title = DEFAULT_TITLE, message = DEFAULT_MESSAGE, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full rounded-2xl border border-brand-border/10 bg-leaderboard-card-to/30 backdrop-blur-sm p-6 text-center min-h-[220px]',
        className
      )}
    >
      <h3 className="font-outfit font-bold text-xl sm:text-2xl text-brand-text-white mb-3">
        {title}
      </h3>
      <p className="font-outfit text-sm sm:text-base text-brand-text-light max-w-[400px]">
        {message}
      </p>
    </div>
  );
}
