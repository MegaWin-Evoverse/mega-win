'use client';
import { Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Skeleton } from '@/shared/ui/skeleton';
import { useRewards } from '../model/useRewards';
import { REWARDS_LABELS, SORT_OPTIONS } from '../model/constants';
import { RewardCard } from './RewardCard';
import type { RewardSort } from '../model/types';

export function Rewards() {
  const { rewards, isLoading, sort, onSortChange } = useRewards();

  return (
    <main className="w-full flex flex-col gap-6 px-4 xl:px-8 py-8">
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

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm text-brand-text-light whitespace-nowrap">
            {REWARDS_LABELS.SORT_LABEL}
          </span>
          <Select value={sort} onValueChange={(v) => onSortChange(v as RewardSort)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
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
            ))
          : rewards.map((reward) => <RewardCard key={reward.id} reward={reward} />)}
      </div>
    </main>
  );
}
