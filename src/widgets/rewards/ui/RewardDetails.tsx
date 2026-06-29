'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Clock } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { useRewardDetails } from '../model/useRewardDetails';
import { useTimeLeft } from '../model/useTimeLeft';
import { REWARDS_LABELS } from '../model/constants';
import { RewardContentRenderer } from './RewardContentRenderer';

interface Props {
  id: string;
}

function RewardDetailsSkeleton() {
  return (
    <article className="flex flex-col gap-6">
      <Skeleton className="w-full h-[480px] rounded-xl" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-8 w-36 rounded-lg" />
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </article>
  );
}

function RewardDetailsContent({ id }: Props) {
  const router = useRouter();
  const { reward, isLoading, isError } = useRewardDetails(id);
  const timeLeft = useTimeLeft(reward?.endDate ?? '');

  if (isLoading) return <RewardDetailsSkeleton />;

  if (isError || !reward) {
    return <p className="text-sm text-brand-text-light">{REWARDS_LABELS.DETAIL_ERROR_MESSAGE}</p>;
  }

  return (
    <article className="flex flex-col gap-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="self-start gap-1.5 text-brand-text-light hover:text-brand-text-white -ml-1"
      >
        <ChevronLeft className="size-4" />
        {REWARDS_LABELS.BACK_LABEL}
      </Button>
      <div className="relative w-full h-[480px] rounded-xl overflow-hidden">
        <Image
          src={reward.photoUrl}
          alt={reward.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
          priority
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-outfit font-bold text-3xl text-brand-text-white">{reward.title}</h1>
        {timeLeft && (
          <div className="flex items-center gap-2 self-start px-3 py-1.5 bg-brand-btn-gradient-to/50 rounded-lg">
            <Clock className="size-4 shrink-0 text-brand-green-rewards" />
            <span className="text-sm font-medium text-brand-text-light">{timeLeft}</span>
          </div>
        )}
        <RewardContentRenderer blocks={reward.content.blocks} />
      </div>
    </article>
  );
}

export function RewardDetails({ id }: Props) {
  return <RewardDetailsContent id={id} />;
}
