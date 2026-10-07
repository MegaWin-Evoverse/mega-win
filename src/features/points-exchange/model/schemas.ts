import { z } from 'zod';
import { EXCHANGE_MESSAGES } from './constants';

export const getPointsExchangeSchema = (maxBalance: number) =>
  z.object({
    amount: z
      .string()
      .refine((val) => {
        const num = Number(val);
        return !Number.isNaN(num) && num > 0;
      }, EXCHANGE_MESSAGES.INVALID_AMOUNT)
      .refine((val) => Number(val) <= maxBalance, EXCHANGE_MESSAGES.INSUFFICIENT_FUNDS),
  });

export type PointsExchangeFormValues = z.infer<ReturnType<typeof getPointsExchangeSchema>>;
