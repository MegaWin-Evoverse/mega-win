import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import { ChevronLeftIcon } from '@/shared/ui/ChevronLeftIcon';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { type FeatureCardData } from '../config/constants';

interface Props {
  card: FeatureCardData;
}

export function FeatureCard({ card }: Props) {
  const { title, href, imageSrc, ariaLabel, decorations } = card;

  return (
    <Link href={href} className="w-full block" aria-label={ariaLabel}>
      <Card
        variant="feature"
        className="h-[270px] group/card relative flex flex-col justify-end overflow-hidden transition-all duration-300 hover:scale-[1.02] select-none isolate"
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-contain sm:object-cover pointer-events-none select-none z-0 max-sm:scale-95"
          priority
        />
        {decorations.map((decoration) => (
          <Image
            key={decoration.src}
            src={decoration.src}
            alt=""
            width={decoration.width}
            height={decoration.height}
            className={cn('absolute pointer-events-none select-none z-0', decoration.className)}
            priority
          />
        ))}
        <div className="absolute w-[300px] h-[240px] left-1/2 -translate-x-1/2 bottom-[-80px] feature-glow-outer pointer-events-none z-0" />
        <div className="absolute w-[180px] h-[140px] left-1/2 -translate-x-1/2 bottom-[-40px] feature-glow-inner mix-blend-plus-lighter pointer-events-none z-0" />
        <div className="absolute left-[-115px] right-[-115px] bottom-[-61px] h-[178px] bg-feature-overlay blur-[49px] pointer-events-none z-10" />
        <div className="relative z-20 flex justify-between items-center w-full">
          <span className="font-outfit font-semibold text-2xl leading-8 text-brand-text-white">
            {title}
          </span>
          <Button
            variant="ghost"
            size="none"
            tabIndex={-1}
            aria-hidden
            className="w-8 h-8 rounded-lg border border-border-default bg-gradient-to-b from-border-default to-brand-btn-gradient-to flex items-center justify-center text-brand-text-white transition-all duration-300 relative overflow-hidden z-0 before:absolute before:inset-0 before:bg-gradient-to-b before:from-brand-green-from before:to-brand-green-to before:opacity-0 before:transition-opacity before:duration-300 before:z-[-1] group-hover/card:before:opacity-100 group-hover/card:border-transparent group-hover/card:text-brand-dark group-hover/card:shadow-[0_0_12px_var(--feature-btn-glow)] cursor-pointer"
          >
            <ChevronLeftIcon className="w-4 h-4 rotate-180 transition-transform duration-300 group-hover/card:translate-x-0.5 relative z-10" />
          </Button>
        </div>
      </Card>
    </Link>
  );
}
