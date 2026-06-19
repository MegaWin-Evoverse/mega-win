import { type Risk, RISK_API_MAP, MULTIPLIER_TIER, type MultiplierTier } from './constants';

const TIER_BY_DISTANCE: readonly MultiplierTier[] = [
  MULTIPLIER_TIER.GREEN,
  MULTIPLIER_TIER.YELLOW,
  MULTIPLIER_TIER.ORANGE_LIGHT,
  MULTIPLIER_TIER.ORANGE,
  MULTIPLIER_TIER.RED,
];

export function getBucketIndex(results: readonly number[]): number {
  return results.reduce((sum, step) => sum + step, 0);
}

export function getMultiplierColorTier(index: number, bucketCount: number): MultiplierTier {
  const center = (bucketCount - 1) / 2;
  const maxDistance = center;
  if (maxDistance === 0) return MULTIPLIER_TIER.GREEN;
  const ratio = Math.abs(index - center) / maxDistance;
  const maxTierIndex = TIER_BY_DISTANCE.length - 1;
  const tierIndex = Math.min(maxTierIndex, Math.round(ratio * maxTierIndex));
  return TIER_BY_DISTANCE[tierIndex];
}

export function toApiRisk(risk: Risk): 'LOW' | 'MEDIUM' | 'HIGH' {
  return RISK_API_MAP[risk];
}
