'use client';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import type { StepCardData } from '../model/types';
import { GETTING_STARTED_CONSTANTS, STEP_ACTION_TYPE } from '../model/constants';
import { useCopyPromoCode } from '../model/useCopyPromoCode';
import { useConnectAccountAction } from '../model/useConnectAccountAction';
import { StepCardMedia } from './StepCardMedia';

interface Props {
  card: StepCardData;
}

const STEP_BUTTON_CLASS =
  'flex h-12 w-full items-center justify-center rounded-lg font-outfit text-lg font-medium';

export function StepCard({ card }: Props) {
  const {
    mediaVariant,
    title,
    leadText,
    description,
    promoCode,
    promoNote,
    buttonLabel,
    action,
    decorations,
  } = card;
  const { handleCopy, isCopied } = useCopyPromoCode(promoCode);
  const { onConnectAccount } = useConnectAccountAction();

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
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
        {action.type === STEP_ACTION_TYPE.EXTERNAL_LINK ? (
          <Button
            variant="main"
            size="none"
            nativeButton={false}
            render={<a href={action.href} target="_blank" rel="noopener noreferrer" />}
            className={STEP_BUTTON_CLASS}
          >
            {buttonLabel}
          </Button>
        ) : (
          <Button
            variant="main"
            size="none"
            onClick={onConnectAccount}
            className={STEP_BUTTON_CLASS}
          >
            {buttonLabel}
          </Button>
        )}
      </div>
    </Card>
  );
}
