import { cn } from '@/shared/lib/cn';
import { TIER_BG_CLASS } from '../model/constants';
import { getMultiplierColorTier, type LandedBucket } from '../model/plinkoHelpers';

interface Props {
  multipliers: readonly number[];
  landedBucket: LandedBucket | null;
}

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
              TIER_BG_CLASS[getMultiplierColorTier(index, multipliers.length)],
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
