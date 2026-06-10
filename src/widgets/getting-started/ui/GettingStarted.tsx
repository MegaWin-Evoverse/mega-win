import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
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
      <div className="flex items-center gap-2">
        <Star className="h-6 w-6 fill-brand-green-to text-brand-green-to" />
        <h2 className="font-outfit text-xl font-semibold text-brand-text-white">
          {GETTING_STARTED_CONSTANTS.SECTION_TITLE}
        </h2>
      </div>
      <div className="flex w-full flex-wrap gap-4 ">
        {GETTING_STARTED_STEPS.map((step) => (
          <StepCard key={step.id} card={step} />
        ))}
      </div>
    </section>
  );
}
