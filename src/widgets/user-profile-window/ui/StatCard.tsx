import Image from 'next/image';
import type { COIN_ICON, GAME_POINT_ICON } from '@/shared/config';

interface Props {
  label: string;
  value: string;
  backgroundSrc: string;
  pointIcon: typeof COIN_ICON | typeof GAME_POINT_ICON;
}

export function StatCard({ label, value, backgroundSrc, pointIcon }: Props) {
  return (
    <div className="relative flex flex-1 items-center overflow-hidden rounded-xl bg-bg-primary px-4 py-3">
      <Image
        src={backgroundSrc}
        alt=""
        width={160}
        height={78}
        className="absolute inset-y-0 left-0 h-full w-[160px] object-cover object-left"
        aria-hidden
        priority
      />
      <div className="relative flex flex-col gap-1">
        <span className="text-sm text-text-secondary">{label}</span>
        <div className="flex items-center gap-1.5">
          <Image
            src={pointIcon.SRC}
            alt={pointIcon.ALT}
            width={pointIcon.SIZE_SUMMARY}
            height={pointIcon.SIZE_SUMMARY}
          />
          <span className="text-base font-semibold text-foreground">{value}</span>
        </div>
      </div>
    </div>
  );
}
