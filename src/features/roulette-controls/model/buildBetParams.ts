import { BET_TYPE, parseBetZoneKey } from './constants';
import { createEmptyBetParams } from './createEmptyBetParams';
import type { BetParams, PlacedBet } from './types';

export function buildBetParams(placedBets: PlacedBet[]): BetParams {
  const params = createEmptyBetParams();

  for (const bet of placedBets) {
    const amount = bet.amount.toString();
    const { value } = parseBetZoneKey(bet.key);

    if (bet.type === BET_TYPE.STRAIGHT) {
      params.straightValues.push({ straightNumber: parseInt(value, 10), amount });
    } else if (bet.type === BET_TYPE.HALF) {
      params.halfValues.push({ half: value, amount });
    } else if (bet.type === BET_TYPE.PARITY) {
      params.parityValues.push({ parity: value, amount });
    } else if (bet.type === BET_TYPE.COLOR) {
      params.colorValues.push({ color: value, amount });
    } else if (bet.type === BET_TYPE.COLUMN) {
      params.columnValues.push({ column: value, amount });
    } else if (bet.type === BET_TYPE.DOZEN) {
      params.dozenValues.push({ dozen: value, amount });
    }
  }

  return params;
}
