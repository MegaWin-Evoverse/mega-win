'use client';

import Link from 'next/link';
import { Copy } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { type StepCardData, GETTING_STARTED_CONSTANTS } from '../config/constants';
import { useCopyPromoCode } from '../model/useCopyPromoCode';
import { StepCardMedia } from './StepCardMedia';

interface Props {
  card: StepCardData;
}

export function StepCard({ card }: Props) {
  const {
    mediaVariant,
    title,
    leadText,
    description,
    promoCode,
    promoNote,
    buttonLabel,
    href,
    decorations,
  } = card;
  const { handleCopy } = useCopyPromoCode(promoCode);

  return (
    <Card variant="gettingStarted" className="min-w-[285px] w-full flex-1">
      <StepCardMedia mediaVariant={mediaVariant} decorations={decorations} />
      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-outfit text-lg font-semibold text-brand-text-white">{title}</h3>
          {leadText && (
            <p className="font-outfit text-sm font-normal text-brand-text-light">{leadText}</p>
          )}
          {promoCode && (
            <Button
              variant="ghost"
              size="none"
              onClick={handleCopy}
              aria-label={GETTING_STARTED_CONSTANTS.COPY_ICON_ALT}
              className="flex w-fit items-center gap-1 font-outfit text-base font-semibold text-brand-green-to hover:opacity-85 cursor-pointer"
            >
              <span>{promoCode}</span>
              <Copy className="h-4 w-4" />
            </Button>
          )}
          {promoNote && (
            <p className="font-outfit text-sm font-normal text-brand-text-light">{promoNote}</p>
          )}
          {description && (
            <p className="font-outfit text-sm font-normal text-brand-text-light">
              {description.map((segment, index) => (
                <span key={index} className={segment.accent ? 'text-brand-green-to' : undefined}>
                  {segment.text}
                </span>
              ))}
            </p>
          )}
        </div>
        <Button
          variant="main"
          size="none"
          nativeButton={false}
          render={<Link href={href} />}
          className="flex h-12 w-full items-center justify-center rounded-lg font-outfit text-lg font-medium"
        >
          {buttonLabel}
        </Button>
      </div>
    </Card>
  );
}
