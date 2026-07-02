import { LEADERBOARD_LABELS } from '../model/constants';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[800px] h-[300px] sm:h-[340px] rounded-2xl border border-brand-border/10 bg-leaderboard-card-to/30 z-10 relative backdrop-blur-sm mx-auto p-6 text-center">
      <h3 className="font-outfit font-bold text-xl sm:text-2xl text-brand-text-white mb-3">
        {LEADERBOARD_LABELS.EMPTY_TITLE}
      </h3>
      <p className="font-outfit text-sm sm:text-base text-brand-text-light max-w-[400px]">
        {LEADERBOARD_LABELS.EMPTY_SUBTITLE}
      </p>
    </div>
  );
}
