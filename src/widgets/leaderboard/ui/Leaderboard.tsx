'use client';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';
import { LEADERBOARD_LABELS } from '../model/constants';
import { useLeaderboard } from '../model/useLeaderboard';
import { Podium } from './Podium';
import { Countdown } from './Countdown';
import { Table } from './Table';

interface Props {
  className?: string;
}

export function Leaderboard({ className }: Props) {
  const { top3, visibleRows, hasMore, loadMore, isLoading, endDate } = useLeaderboard();

  return (
    <main className={cn('w-full flex flex-col items-center gap-10 px-4 xl:px-8 py-10', className)}>
      <section
        aria-label="Leaderboard competition"
        className="w-full relative overflow-visible flex flex-col items-center py-10 px-4 xl:px-8 isolate min-h-[618px] rounded-2xl border border-brand-border/10 bg-gradient-to-b from-leaderboard-bg-from/50 to-leaderboard-bg-to/80 leaderboard-shadow"
      >
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden rounded-2xl">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[550px] bg-gradient-to-b from-leaderboard-glow-from/10 to-leaderboard-glow-to/0 blur-[80px] opacity-40" />
          <Image
            src="/monthly-leaderboard/backdrop.svg"
            alt=""
            fill
            className="object-cover opacity-5"
            priority
          />
        </div>
        <div className="flex flex-col items-center text-center z-10 relative mb-10 xl:mb-14 max-w-[800px] mx-auto gap-3">
          <h1 className="font-outfit font-black text-3xl xl:text-5xl text-brand-text-white uppercase tracking-tight">
            {LEADERBOARD_LABELS.TITLE}
          </h1>
          <p className="font-outfit font-normal text-base xl:text-lg text-brand-text-light leading-relaxed">
            {LEADERBOARD_LABELS.SUBTITLE}
          </p>
        </div>
        <Podium top3={top3} />
        <div className="flex flex-col items-center gap-6 z-10 relative mt-12 xl:mt-16 w-full">
          <Countdown endDate={endDate} />
          <p className="text-sm text-brand-text-light text-center max-w-[560px]">
            {LEADERBOARD_LABELS.INFO_PRE}
            <strong className="text-brand-text-white font-semibold">
              {LEADERBOARD_LABELS.INFO_BOLD}
            </strong>
            {LEADERBOARD_LABELS.INFO_MID}
            <strong className="text-brand-text-white font-bold tracking-widest">
              {LEADERBOARD_LABELS.INFO_CODE}
            </strong>
            {LEADERBOARD_LABELS.INFO_END}
          </p>
          <Button variant="main" size="action" className="w-[220px]">
            {LEADERBOARD_LABELS.JOIN_BUTTON}
          </Button>
        </div>
      </section>
      <section aria-label="Leaderboard rankings" className="w-full max-w-[900px] mx-auto">
        <Table rows={visibleRows} hasMore={hasMore} onLoadMore={loadMore} isLoading={isLoading} />
      </section>
    </main>
  );
}
