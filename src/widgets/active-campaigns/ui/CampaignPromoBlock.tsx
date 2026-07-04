'use client';
import { Clock, Copy, Check } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { CAMPAIGN_CONSTANTS } from '../model/constants';
import { cn } from '@/shared/lib/cn';

interface Props {
  promoCode?: string;
  useCodeLabel?: string;
  endTimeString: string;
  isFortuneBonus: boolean;
  isCopied: boolean;
  onCopy: () => Promise<void>;
}

export function CampaignPromoBlock({
  promoCode,
  useCodeLabel,
  endTimeString,
  isFortuneBonus,
  isCopied,
  onCopy,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      {promoCode && (
        <div className="flex items-center gap-1">
          <span className="font-outfit font-medium text-base text-brand-text-white">
            {useCodeLabel}
          </span>
          <Button
            variant="ghost"
            size="none"
            onClick={onCopy}
            aria-label={CAMPAIGN_CONSTANTS.COPY_ICON_ALT}
            className="flex items-center gap-1 font-outfit font-semibold text-base text-promo-purple hover:opacity-85 cursor-pointer"
          >
            <span>{promoCode}</span>
            {isCopied ? (
              <Check className="w-4 h-4 text-brand-green-to" />
            ) : (
              <Copy className="w-4 h-4 text-promo-purple" />
            )}
          </Button>
        </div>
      )}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-btn-gradient-to/50 rounded-lg backdrop-blur-sm">
        <Clock className={cn('w-4 h-4', isFortuneBonus ? 'text-promo-purple' : 'text-promo-red')} />
        <span className="font-outfit font-medium text-sm text-brand-text-light flex items-center gap-0.5">
          {endTimeString.split(CAMPAIGN_CONSTANTS.SPLIT_DELIMITER).map((part, index) => {
            if (part === CAMPAIGN_CONSTANTS.COLON_CHAR) {
              return (
                <span key={index} className="text-brand-text-muted font-semibold mx-0.5">
                  {CAMPAIGN_CONSTANTS.COLON_CHAR}
                </span>
              );
            }
            return (
              <span key={index} className="text-brand-text-light">
                {part}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
}
