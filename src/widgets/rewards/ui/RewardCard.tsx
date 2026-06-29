'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { REWARDS_LABELS } from '../model/constants';
import type { Reward } from '../model/types';
import { useTimeLeft } from '../model/useTimeLeft';

interface Props {
  reward: Reward;
}

export function RewardCard({ reward }: Props) {
  const { title, shortDescription, photoUrl, endDate, id } = reward;
  const timeLeft = useTimeLeft(endDate);

  return (
    <Link
      href={`/rewards/${id}`}
      className="flex flex-col rounded-xl border border-brand-border overflow-hidden hover:brightness-110 transition-all"
    >
      <div className="relative h-[200px] bg-[linear-gradient(196deg,var(--color-brand-border)_-4%,var(--color-card-feature)_87%)] shrink-0">
        <Image
          src={photoUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-3 p-5 bg-brand-border">
        <div className="flex flex-col gap-1">
          <h3 className="font-outfit font-semibold text-xl leading-6 text-brand-text-white">
            {title}
          </h3>
          <p className="font-outfit text-base leading-5 text-brand-text-muted">
            {shortDescription}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-brand-text-light">
            {REWARDS_LABELS.TIME_LEFT_LABEL}
          </span>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-btn-gradient-to/50 rounded-lg">
            <Clock className="size-4 shrink-0 text-brand-green-rewards" />
            <span className="text-sm font-medium text-brand-text-light">{timeLeft}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
