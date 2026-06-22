import { SectionTitle } from '@/shared/ui/section-title';
import { cn } from '@/shared/lib/cn';
import { FEATURE_CARDS } from '../config/constants';
import { FeatureCard } from './FeatureCard';
import crownIcon from '../assets/icons/crown.svg';

const SECTION_TITLE = 'Features';

interface Props {
  className?: string;
}

export function Features({ className }: Props) {
  return (
    <section className={cn('w-full mt-[35px] flex flex-col gap-4', className)}>
      <SectionTitle title={SECTION_TITLE} iconSrc={crownIcon} iconWidth={23} iconHeight={18} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
