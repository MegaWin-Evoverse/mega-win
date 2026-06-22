'use client';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { REWARDS_LABELS } from '../model/constants';
import type { Reward } from '../model/types';
import { useTimeLeft } from '../model/useTimeLeft';

interface Props {
  reward: Reward;
}

export function RewardCard({ reward }: Props) {
  const { title, shortDescription, photoUrl, endDate } = reward;
  const timeLeft = useTimeLeft(endDate);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-brand-border/10 bg-card">
      <div className="relative w-full aspect-[3/2] shrink-0">
        <Image
          src={photoUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-1 px-4 py-4">
        <h3 className="font-outfit font-bold text-base text-brand-text-white leading-snug">
          {title}
        </h3>
        <p className="font-outfit text-sm text-brand-text-light leading-relaxed">
          {shortDescription}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-brand-text-light">{REWARDS_LABELS.TIME_LEFT_LABEL}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-from/15 border border-brand-green-from/30 px-3 py-1 text-xs font-semibold text-brand-green-from">
            <Clock className="size-3.5 shrink-0" />
            {timeLeft}
          </span>
        </div>
      </div>
    </div>
  );
}
