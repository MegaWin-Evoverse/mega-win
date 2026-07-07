'use client';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';
import {
  LEADERBOARD_LABELS,
  LEADERBOARD_BG_SRC,
  PODIUM_CHIPS_SRC,
  PODIUM_ROCKET_SRC,
  LEADERBOARD_DECOR_SIZES,
} from '../model/constants';
import { Podium, PodiumSkeleton, LeaderboardEmptyState } from '@/entities/leaderboard';
import { useLeaderboard } from '../model/useLeaderboard';
import { Countdown } from './Countdown';
import { Table } from './Table';
import { CompetitionRules } from './CompetitionRules';

interface Props {
  className?: string;
}

export function Leaderboard({ className }: Props) {
  const { top3, visibleRows, hasMore, loadMore, isLoading, endDate } = useLeaderboard();
  const hasData = top3.length > 0;

  return (
    <main
      className={cn(
        'w-full flex flex-col items-center gap-6 sm:gap-10 px-4 xl:px-8 py-6 sm:py-10',
        className
      )}
    >
      <section
        aria-label="Leaderboard competition"
        className="w-full relative overflow-visible flex flex-col items-center py-10 px-4 xl:px-8 isolate min-h-[618px] rounded-2xl border border-brand-border/10 bg-gradient-to-b from-leaderboard-bg-from/50 to-leaderboard-bg-to/80 leaderboard-shadow"
      >
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden rounded-2xl">
          <Image src={LEADERBOARD_BG_SRC} alt="" fill className="object-cover" priority />
        </div>
        {hasData && (
          <>
            <div className="absolute left-5 top-[33%] pointer-events-none select-none z-[5] hidden xl:block rotate-[180deg]">
              <Image
                src={PODIUM_CHIPS_SRC}
                alt=""
                width={LEADERBOARD_DECOR_SIZES.CHIPS_WIDTH}
                height={LEADERBOARD_DECOR_SIZES.CHIPS_HEIGHT}
                className="object-contain"
              />
            </div>
            <div className="absolute -right-5 top-[25%] pointer-events-none select-none z-[4] hidden xl:block">
              <Image
                src={PODIUM_ROCKET_SRC}
                alt=""
                width={LEADERBOARD_DECOR_SIZES.ROCKET_WIDTH}
                height={LEADERBOARD_DECOR_SIZES.ROCKET_HEIGHT}
                className="object-contain"
              />
            </div>
            <div className="absolute right-5 top-[40%] pointer-events-none select-none z-[5] hidden xl:block">
              <Image
                src={PODIUM_CHIPS_SRC}
                alt=""
                width={LEADERBOARD_DECOR_SIZES.CHIPS_WIDTH}
                height={LEADERBOARD_DECOR_SIZES.CHIPS_HEIGHT}
                className="object-contain"
              />
            </div>
          </>
        )}
        <div className="flex flex-col items-center text-center z-10 relative mb-6 sm:mb-10 xl:mb-14 max-w-[800px] mx-auto gap-3">
          <h1 className="font-outfit font-black text-2xl sm:text-3xl xl:text-5xl text-brand-text-white uppercase tracking-tight">
            {LEADERBOARD_LABELS.TITLE}
          </h1>
          <p className="font-outfit font-normal text-sm sm:text-base xl:text-lg text-brand-text-light leading-relaxed">
            {LEADERBOARD_LABELS.SUBTITLE}
          </p>
        </div>
        {isLoading ? (
          <PodiumSkeleton />
        ) : top3.length > 0 ? (
          <Podium top3={top3} />
        ) : (
          <LeaderboardEmptyState className="max-w-[800px] z-10 relative" />
        )}
        <div className="flex flex-col items-center gap-4 sm:gap-6 z-10 relative mt-8 sm:mt-12 xl:mt-16 w-full">
          <Countdown endDate={endDate} />
          <div className="flex items-center p-3 gap-[10px] w-full max-w-[890px] rounded-lg bg-leaderboard-disclaimer-bg">
            <p className="font-outfit font-light text-sm sm:text-base leading-5 text-center w-full text-leaderboard-disclaimer-text">
              {`${LEADERBOARD_LABELS.INFO_PRE} ${LEADERBOARD_LABELS.INFO_BOLD} ${LEADERBOARD_LABELS.INFO_MID} ${LEADERBOARD_LABELS.INFO_CODE} ${LEADERBOARD_LABELS.INFO_END}`}
            </p>
          </div>
          <Button variant="main" size="action" className="w-[220px]">
            {LEADERBOARD_LABELS.JOIN_BUTTON}
          </Button>
        </div>
      </section>
      <section aria-label="Leaderboard rankings" className="w-full max-w-[900px] mx-auto">
        <Table rows={visibleRows} hasMore={hasMore} onLoadMore={loadMore} isLoading={isLoading} />
      </section>
      <section
        aria-label="Competition rules and eligibility"
        className="w-full max-w-[900px] mx-auto"
      >
        <CompetitionRules />
      </section>
    </main>
  );
}
