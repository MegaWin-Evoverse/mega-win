import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import { CARD_ACCENT_GLOW_CLASS } from '../model/constants';
import type { GameCardData } from '../model/types';

interface Props {
  card: GameCardData;
  isPriority?: boolean;
}

export function GameCard({ card, isPriority }: Props) {
  const { title, imageSrc, imageWidth, imageHeight, href, accentColor } = card;

  return (
    <Link
      href={href}
      className={cn(
        'relative block w-full overflow-hidden rounded-xl bg-brand-border/30 border border-brand-border/20 transition-all duration-300 ease-out hover:border-brand-border hover:scale-[1.04] group cursor-pointer',
        CARD_ACCENT_GLOW_CLASS[accentColor]
      )}
    >
      <Image
        src={imageSrc}
        alt={title}
        width={imageWidth}
        height={imageHeight}
        className="w-full h-auto block"
        priority={isPriority}
        loading={isPriority ? undefined : 'lazy'}
      />
    </Link>
  );
}
