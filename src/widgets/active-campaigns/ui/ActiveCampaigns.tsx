import { CampaignCard } from './CampaignCard';
import { CAMPAIGN_CARDS, CAMPAIGN_CONSTANTS } from '../config/constants';
import { cn } from '@/shared/lib/cn';

interface Props {
  className?: string;
}

export function ActiveCampaigns({ className }: Props) {
  return (
    <section
      aria-label={CAMPAIGN_CONSTANTS.SECTION_ARIA_LABEL}
      className={cn(
        'w-full flex flex-col md:flex-row gap-4 items-center justify-between',
        className
      )}
    >
      {CAMPAIGN_CARDS.map((card) => (
        <CampaignCard key={card.id} card={card} />
      ))}
    </section>
  );
}
