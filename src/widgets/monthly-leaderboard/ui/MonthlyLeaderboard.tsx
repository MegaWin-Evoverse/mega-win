'use client';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/shared/lib/cn';
import { EmptyState } from '@/shared/ui/empty-state';
import {
  LEADERBOARD_CONSTANTS,
  LEADERBOARD_DECORATIONS,
  LEADERBOARD_BACKDROP,
  LEADERBOARD_ROUTE,
  PODIUM_CLASSES,
} from '../model/constants';
import { useMonthlyLeaderboard } from '../model/useMonthlyLeaderboard';
import { LeaderboardCard } from './LeaderboardCard';

interface Props {
  className?: string;
}

export function MonthlyLeaderboard({ className }: Props) {
  const { cards, isEmpty } = useMonthlyLeaderboard();

  return (
    <section
      aria-label={LEADERBOARD_CONSTANTS.SECTION_ARIA_LABEL}
      className={cn(
        'w-full relative overflow-visible flex flex-col items-center justify-start py-10 px-4 xl:px-8 isolate min-h-[618px] rounded-2xl border border-brand-border/10 bg-gradient-to-b from-leaderboard-bg-from/50 to-leaderboard-bg-to/80 leaderboard-shadow',
        className
      )}
    >
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden rounded-2xl">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[550px] bg-gradient-to-b from-leaderboard-glow-from/10 to-leaderboard-glow-to/0 blur-[80px] opacity-40" />
        <Image
          src={LEADERBOARD_BACKDROP.src}
          alt=""
          fill
          className="object-cover opacity-5"
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 max-w-[690px] mx-auto text-center z-10 relative mb-10 xl:mb-14">
        <h2 className="font-outfit font-black text-4xl xl:text-5xl text-brand-text-white uppercase tracking-tight">
          {LEADERBOARD_CONSTANTS.SECTION_TITLE}
        </h2>
        <p className="font-outfit font-normal text-base xl:text-lg text-brand-text-light leading-relaxed">
          {LEADERBOARD_CONSTANTS.SECTION_DESCRIPTION}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 xl:gap-8 w-full max-w-[1000px] mx-auto z-10 relative">
        {isEmpty ? (
          <EmptyState className="max-w-[800px] h-[300px] sm:h-[340px]" />
        ) : (
          cards.map((card, idx) => (
            <LeaderboardCard key={card.id} card={card} className={PODIUM_CLASSES[idx]} />
          ))
        )}
        {!isEmpty &&
          LEADERBOARD_DECORATIONS.map((decoration) => (
            <div
              key={decoration.id}
              className={cn(
                'absolute pointer-events-none select-none z-0 hidden xl:block opacity-95',
                decoration.wrapperClass
              )}
            >
              <Image
                src={decoration.src}
                alt=""
                width={decoration.width}
                height={decoration.height}
                className={cn('object-contain', decoration.imageClass)}
                priority
              />
            </div>
          ))}
      </div>
      <div className="flex justify-center w-full mt-10 xl:mt-8 z-10 relative">
        <Link
          href={LEADERBOARD_ROUTE}
          className="w-[200px] h-[48px] border border-brand-border/20 hover:border-brand-border bg-gradient-to-b from-brand-border to-brand-btn-gradient-to hover:from-brand-btn-gradient-to hover:to-leaderboard-btn-hover-to rounded-lg text-brand-text-white font-semibold text-base flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03]"
        >
          {LEADERBOARD_CONSTANTS.VIEW_ALL_BUTTON}
        </Link>
      </div>
    </section>
  );
}
