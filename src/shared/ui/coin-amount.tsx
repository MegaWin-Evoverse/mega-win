import Image, { type StaticImageData } from 'next/image';
import { COIN_ICON as DEFAULT_COIN_ICON } from '@/shared/config';
import { cn } from '@/shared/lib/cn';

interface CoinIcon {
  SRC: StaticImageData;
}

interface Props {
  value: string | number;
  icon?: CoinIcon;
  size?: number;
  className?: string;
}

export function CoinAmount({ value, icon = DEFAULT_COIN_ICON, size = 14, className }: Props) {
  return (
    <span className={cn('flex items-center gap-1.5', className)}>
      <Image src={icon.SRC} alt="" width={size} height={size} aria-hidden />
      <span>${value}</span>
    </span>
  );
}
