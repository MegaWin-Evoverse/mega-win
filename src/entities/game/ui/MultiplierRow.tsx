import { cn } from '@/shared/lib/cn';
import { MULTIPLIER_TIER, type MultiplierTier } from '../model/constants';
import { getMultiplierColorTier, type LandedBucket } from '../model/plinkoHelpers';

interface Props {
  multipliers: readonly number[];
  landedBucket: LandedBucket | null;
}

const TIER_CLASS: Record<MultiplierTier, string> = {
  [MULTIPLIER_TIER.GREEN]: 'bg-plinko-green',
  [MULTIPLIER_TIER.YELLOW]: 'bg-plinko-yellow',
  [MULTIPLIER_TIER.ORANGE_LIGHT]: 'bg-plinko-orange-light',
  [MULTIPLIER_TIER.ORANGE]: 'bg-plinko-orange',
  [MULTIPLIER_TIER.RED]: 'bg-plinko-red',
};

export function MultiplierRow({ multipliers, landedBucket }: Props) {
  return (
    <div className="flex w-full items-center justify-center gap-1.5 px-4">
      {multipliers.map((value, index) => {
        const isLanded = landedBucket?.bucket === index;
        return (
          <span
            key={isLanded ? `${index}-${landedBucket.hitAt}` : `${index}-${value}`}
            className={cn(
              'flex h-[30px] min-w-0 flex-1 items-center justify-center rounded-lg px-1 text-[11px] font-semibold uppercase text-plinko-multiplier-text truncate',
              TIER_CLASS[getMultiplierColorTier(index, multipliers.length)],
              isLanded && 'animate-plinko-bucket-land'
            )}
          >
            {value}x
          </span>
        );
      })}
    </div>
  );
}
