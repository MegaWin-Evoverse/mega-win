import { getBucketIndex, getMultiplierColorTier, toApiRisk } from './plinkoHelpers';
import { MULTIPLIER_TIER, RISK } from './constants';

describe('plinko helpers', () => {
  it('derives bucket index, color tier, and api risk', () => {
    expect(getBucketIndex([0, 1, 1, 1, 0, 0, 0, 1])).toBe(4);
    expect(getBucketIndex([0, 0, 0])).toBe(0);
    expect(getMultiplierColorTier(4, 9)).toBe(MULTIPLIER_TIER.GREEN);
    expect(getMultiplierColorTier(3, 9)).toBe(MULTIPLIER_TIER.YELLOW);
    expect(getMultiplierColorTier(2, 9)).toBe(MULTIPLIER_TIER.ORANGE_LIGHT);
    expect(getMultiplierColorTier(1, 9)).toBe(MULTIPLIER_TIER.ORANGE);
    expect(getMultiplierColorTier(0, 9)).toBe(MULTIPLIER_TIER.RED);
    expect(getMultiplierColorTier(8, 9)).toBe(MULTIPLIER_TIER.RED);
    expect(toApiRisk(RISK.MEDIUM)).toBe('MEDIUM');
    expect(toApiRisk(RISK.LOW)).toBe('LOW');
  });
});
