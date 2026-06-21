import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { BUTTON_LABELS } from '@/shared/config';
import type { DailyClaimUiState } from '@/features/daily-claim';

interface Props {
  uiState: DailyClaimUiState;
  pointsAmount: number;
  countdownLabel: string;
  isClaiming: boolean;
  onAction: () => void;
}

export function DailyClaimerCard({
  uiState,
  pointsAmount,
  countdownLabel,
  isClaiming,
  onAction,
}: Props) {
  return (
    <Card className="daily-claimer-card relative h-[124px] w-[195px] flex-none gap-0 self-stretch overflow-hidden rounded-[7.619px] bg-daily-claimer-bg py-0 ring-0">
      <div
        aria-hidden
        className="absolute left-1/2 top-[115px] h-[43px] w-[318px] -translate-x-1/2 bg-daily-claimer-glow blur-[69px]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-7 w-[calc(100%+7px)] bg-gradient-to-t from-daily-claimer-overlay to-transparent"
      />
      <Image
        src="/daily-claimer-chest.png"
        width={111}
        height={118}
        alt=""
        aria-hidden
        unoptimized
        className="absolute -bottom-[9px] -right-[29px]"
      />
      <p className="absolute left-3 top-3 w-[100px] font-outfit text-base font-semibold leading-5 text-brand-text-white">
        DAILY CLAIMER!
      </p>
      {uiState === 'countdown' ? (
        <span className="absolute bottom-3 left-3 font-outfit text-sm font-medium text-brand-text-white">
          {countdownLabel}
        </span>
      ) : (
        <Button
          variant="main"
          className="absolute bottom-3 left-3 h-8 w-24 gap-1 px-3 text-sm"
          aria-label={uiState === 'login' ? undefined : 'Claim daily reward'}
          disabled={isClaiming}
          onClick={onAction}
        >
          {uiState === 'login' ? (
            BUTTON_LABELS.LOG
          ) : (
            <>
              {BUTTON_LABELS.CLAIM}
              <Image src="/icons/coin.svg" width={14} height={14} alt="" aria-hidden />
              <span>{pointsAmount}</span>
            </>
          )}
        </Button>
      )}
    </Card>
  );
}
