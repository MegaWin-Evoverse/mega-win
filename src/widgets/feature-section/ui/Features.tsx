import Image from 'next/image';

import { cn } from '@/shared/lib/cn';
import { FEATURE_CARDS } from '../config/constants';
import { FeatureCard } from './FeatureCard';

const SECTION_TITLE = 'Features';

interface Props {
  className?: string;
}

export function Features({ className }: Props) {
  return (
    <section className={cn('w-full mt-[35px] flex flex-col gap-4', className)}>
      <div className="flex items-center gap-2.5">
        <Image
          src="/feature/crown.svg"
          width={23}
          height={18}
          alt=""
          className="shrink-0"
          priority
        />
        <h2 className="font-outfit font-semibold text-[20px] leading-[28px] text-brand-text-white tracking-normal select-none">
          {SECTION_TITLE}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
