import type { BetParams } from './types';

export function createEmptyBetParams(): BetParams {
  return {
    straightValues: [],
    halfValues: [],
    parityValues: [],
    colorValues: [],
    columnValues: [],
    dozenValues: [],
    splitValues: [],
    cornerValues: [],
    streetValues: [],
    doubleStreetValues: [],
  };
}
