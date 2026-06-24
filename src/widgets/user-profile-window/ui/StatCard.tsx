import Image from 'next/image';
import { COIN_ICON } from '@/shared/config';
import { STAT_CARD_IMAGE } from '../model/constants';

interface Props {
  label: string;
  value: string;
}

export function StatCard({ label, value }: Props) {
  return (
    <div className="relative flex items-center gap-4 overflow-hidden rounded-xl bg-bg-primary px-4 py-3 flex-1">
      <Image
        src={STAT_CARD_IMAGE.SRC}
        alt={STAT_CARD_IMAGE.ALT}
        width={STAT_CARD_IMAGE.WIDTH}
        height={STAT_CARD_IMAGE.HEIGHT}
        className="shrink-0 object-contain"
        aria-hidden
      />
      <div className="flex flex-col gap-1">
        <span className="text-sm text-text-secondary">{label}</span>
        <div className="flex items-center gap-1.5">
          <Image
            src={COIN_ICON.SRC}
            alt={COIN_ICON.ALT}
            width={COIN_ICON.SIZE_SUMMARY}
            height={COIN_ICON.SIZE_SUMMARY}
          />
          <span className="text-base font-semibold text-foreground">{value}</span>
        </div>
      </div>
    </div>
  );
}
