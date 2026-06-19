import { BET_TYPE, type BetType } from './constants';

const CHIP_K_MULTIPLIER = 1000;

// Single source for bet zone keys: store, table cells and the bet payload builder
// must all agree on this format (`<type>-<value>`).
export function betZoneKey(type: BetType, value: string | number): string {
  return `${type}-${value}`;
}

function isBetType(value: string): value is BetType {
  return (Object.values(BET_TYPE) as string[]).includes(value);
}

export function parseBetZoneKey(key: string): { type: BetType | null; value: string } {
  const dashIndex = key.indexOf('-');
  const type = key.slice(0, dashIndex);
  return {
    type: isBetType(type) ? type : null,
    value: key.slice(dashIndex + 1),
  };
}

export function parseChipValue(nominal: string): number {
  if (nominal.endsWith('K')) {
    return parseFloat(nominal.slice(0, -1)) * CHIP_K_MULTIPLIER;
  }
  return parseFloat(nominal);
}
