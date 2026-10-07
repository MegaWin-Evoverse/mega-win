import Image from 'next/image';
import { COIN_ICON } from '@/shared/config';

interface Props {
  label: string;
  value: string;
  withCoin?: boolean;
}

export function SummaryCard({ label, value, withCoin = false }: Props) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border-default bg-border-default/25 p-3">
      <span className="font-outfit text-xs font-medium text-brand-text-muted">{label}</span>
      {withCoin ? (
        <div className="flex items-center gap-1.5">
          <Image
            src={COIN_ICON.SRC}
            alt={COIN_ICON.ALT}
            width={COIN_ICON.SIZE_SUMMARY}
            height={COIN_ICON.SIZE_SUMMARY}
          />
          <span className="font-outfit text-sm font-semibold text-brand-text-white">{value}</span>
        </div>
      ) : (
        <span className="font-outfit text-sm font-semibold text-brand-text-white">{value}</span>
      )}
    </div>
  );
}
