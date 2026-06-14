import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { SectionTitle } from '@/shared/ui/section-title';
import { GETTING_STARTED_STEPS, GETTING_STARTED_CONSTANTS } from '../config/constants';
import { StepCard } from './StepCard';

interface Props {
  className?: string;
}

export function GettingStarted({ className }: Props) {
  return (
    <section
      aria-label={GETTING_STARTED_CONSTANTS.SECTION_ARIA_LABEL}
      className={cn('flex w-full flex-col gap-4', className)}
    >
      <SectionTitle
        title={GETTING_STARTED_CONSTANTS.SECTION_TITLE}
        icon={<Star className="h-6 w-6 fill-brand-green-to text-brand-green-to" />}
      />
      <div className="flex w-full flex-wrap gap-4 ">
        {GETTING_STARTED_STEPS.map((step) => (
          <StepCard key={step.id} card={step} />
        ))}
      </div>
    </section>
  );
}
