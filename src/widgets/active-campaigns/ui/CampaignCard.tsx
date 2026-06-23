'use client';
import Image from 'next/image';
import { Card } from '@/shared/ui/card';
import { useCampaignCard } from '../model/useCampaignCard';
import { type CampaignCardData, CAMPAIGN_CONSTANTS, CAMPAIGN_IDS } from '../config/constants';
import { cn } from '@/shared/lib/cn';
import { CampaignPromoBlock } from './CampaignPromoBlock';
import { CampaignLogoBlock } from './CampaignLogoBlock';

interface Props {
  card: CampaignCardData;
}

export function CampaignCard({ card }: Props) {
  const {
    id,
    variant,
    subtitle,
    title,
    promoCode,
    useCodeLabel,
    endTimeString,
    logoSrc,
    bgImageSrc,
  } = card;
  const { handleCopy } = useCampaignCard(promoCode);

  const isFortuneBonus = id === CAMPAIGN_IDS.FORTUNE_BONUS;

  return (
    <Card
      variant={variant}
      className={cn(
        'h-[220px] relative overflow-hidden flex flex-col justify-between select-none isolate p-5',
        'w-full md:w-auto md:flex-1 shrink-0'
      )}
    >
      <Image
        src={bgImageSrc}
        alt={CAMPAIGN_CONSTANTS.IMAGE_DECORATION_ALT}
        fill
        className="object-cover object-center z-0 pointer-events-none select-none"
        priority
      />
      <div className="flex flex-col justify-between items-start h-full w-full z-10">
        <div className="flex flex-col items-start gap-1">
          <span className="font-outfit font-normal text-lg text-brand-text-light">{subtitle}</span>
          <h3 className="font-outfit font-black text-4xl text-brand-text-white uppercase tracking-tight">
            {title}
          </h3>
        </div>
        <CampaignPromoBlock
          promoCode={promoCode}
          useCodeLabel={useCodeLabel}
          endTimeString={endTimeString}
          isFortuneBonus={isFortuneBonus}
          onCopy={handleCopy}
        />
      </div>
      {logoSrc && <CampaignLogoBlock logoSrc={logoSrc} logoAlt={CAMPAIGN_CONSTANTS.LOGO_ALT} />}
    </Card>
  );
}
