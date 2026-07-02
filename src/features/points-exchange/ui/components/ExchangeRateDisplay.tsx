import Image from 'next/image';

import { COIN_ICON, GAME_POINT_ICON } from '@/shared/config';

import { EXCHANGE_UI_TEXT } from '../../model/constants';

export function ExchangeRateDisplay() {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4 w-full mb-5">
      <div className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2 h-11 rounded-lg border border-border-default bg-border-default/25 px-2 sm:px-4">
        <Image
          src={COIN_ICON.SRC}
          alt={EXCHANGE_UI_TEXT.WATCH_POINT_ALT}
          width={20}
          height={20}
          className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
        />
        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
          1{' '}
          <span className="text-auth-text-secondary font-normal">
            {EXCHANGE_UI_TEXT.WATCH_POINT_NAME}
          </span>
        </span>
      </div>
      <span className="font-bold text-base sm:text-lg text-auth-text-secondary shrink-0">=</span>
      <div className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2 h-11 rounded-lg border border-border-default bg-border-default/25 px-2 sm:px-4">
        <Image
          src={GAME_POINT_ICON.SRC}
          alt={EXCHANGE_UI_TEXT.GAME_POINT_ALT}
          width={20}
          height={20}
          className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
        />
        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
          1{' '}
          <span className="text-auth-text-secondary font-normal">
            {EXCHANGE_UI_TEXT.GAME_POINT_NAME}
          </span>
        </span>
      </div>
    </div>
  );
}
