'use client';
import { Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Skeleton } from '@/shared/ui/skeleton';
import { useRewards } from '../model/useRewards';
import { DEFAULT_TAKE, REWARDS_LABELS, SORT_OPTIONS } from '../model/constants';
import { RewardCard } from './RewardCard';

export function Rewards() {
  const { rewards, isLoading, isError, sort, onSortChange } = useRewards();

  return (
    <main className="w-full flex flex-col gap-6 ">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <Star className="size-6 text-brand-green-from fill-brand-green-from shrink-0" />
            <h1 className="font-outfit font-semibold text-xl text-brand-text-white">
              {REWARDS_LABELS.PAGE_TITLE}
            </h1>
          </div>
          <p className="text-sm text-brand-text-light max-w-[600px]">
            {REWARDS_LABELS.PAGE_SUBTITLE}
          </p>
        </div>

        <Select value={sort} onValueChange={onSortChange} items={SORT_OPTIONS}>
          <SelectTrigger className="w-[172px] data-[size=default]:h-12 shrink-0 bg-brand-bg border-0 px-4 gap-2 [&>span:last-child]:size-6 [&>span:last-child]:bg-brand-border [&>span:last-child]:rounded-lg [&>span:last-child]:flex [&>span:last-child]:items-center [&>span:last-child]:justify-center [&>span:last-child]:shrink-0">
            <div className="flex items-center gap-1">
              <span className="font-outfit text-sm font-medium text-[var(--auth-text-muted)] whitespace-nowrap">
                {REWARDS_LABELS.SORT_LABEL}
              </span>
              <SelectValue className="font-outfit text-sm font-medium text-brand-green-to flex-none" />
            </div>
          </SelectTrigger>
          <SelectContent
            alignItemWithTrigger={false}
            className="bg-[var(--gs-content)] border border-brand-border/30"
          >
            {SORT_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="font-outfit font-medium text-sm text-[var(--auth-text-muted)] px-4 py-3 rounded-lg focus:bg-brand-border/50 focus:text-brand-text-white"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: DEFAULT_TAKE }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-xl border border-brand-border/10 bg-card"
            >
              <Skeleton className="w-full aspect-[3/2]" />
              <div className="flex flex-col gap-2 px-4 py-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-7 w-36 mt-1 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : isError || rewards.length === 0 ? (
        <p className="text-sm text-brand-text-light">
          {isError ? REWARDS_LABELS.ERROR_MESSAGE : REWARDS_LABELS.EMPTY_MESSAGE}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      )}
    </main>
  );
}
