import Image from 'next/image';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';

import { AmountInput } from '@/shared/ui/amount-input';
import { FieldError } from '@/shared/ui/field-error';
import { COIN_ICON, GAME_POINT_ICON } from '@/shared/config';

import { EXCHANGE_UI_TEXT, EXCHANGE_FORM_FIELDS } from '../../model/constants';
import type { PointsExchangeFormValues } from '../../model/schema';

interface Props {
  control: Control<PointsExchangeFormValues>;
  errors: FieldErrors<PointsExchangeFormValues>;
  amount: string;
  watchPointsBalance: string;
  gamePointsBalance: string;
}

export function ExchangeFormFields({
  control,
  errors,
  amount,
  watchPointsBalance,
  gamePointsBalance,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-4 mb-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-auth-text-secondary">
          {EXCHANGE_UI_TEXT.YOU_GIVE_LABEL}
        </span>
        <Controller
          name={EXCHANGE_FORM_FIELDS.AMOUNT}
          control={control}
          render={({ field }) => (
            <AmountInput
              value={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              iconSrc={COIN_ICON.SRC}
              inputMode="numeric"
              trailing={
                <div className="flex items-center gap-1.5 px-2 py-1 bg-border-default/25 rounded-md text-xs text-auth-text-secondary">
                  {EXCHANGE_UI_TEXT.BALANCE_LABEL}{' '}
                  <Image src={COIN_ICON.SRC} alt="" width={12} height={12} />{' '}
                  <span className="text-white font-medium">
                    {Number(watchPointsBalance).toLocaleString()}
                  </span>
                </div>
              }
            />
          )}
        />
        {errors[EXCHANGE_FORM_FIELDS.AMOUNT] && (
          <FieldError message={errors[EXCHANGE_FORM_FIELDS.AMOUNT]?.message} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-auth-text-secondary">
          {EXCHANGE_UI_TEXT.YOU_RECEIVE_LABEL}
        </span>
        <AmountInput
          value={amount || '0'}
          readOnly
          iconSrc={GAME_POINT_ICON.SRC}
          trailing={
            <div className="flex items-center gap-1.5 px-2 py-1 bg-border-default/25 rounded-md text-xs text-auth-text-secondary">
              {EXCHANGE_UI_TEXT.BALANCE_LABEL}{' '}
              <Image src={GAME_POINT_ICON.SRC} alt="" width={12} height={12} />{' '}
              <span className="text-white font-medium">
                {Number(gamePointsBalance).toLocaleString()}
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
}
