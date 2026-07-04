import { cn } from '@/shared/lib/cn';
import { TIER_BG_CLASS } from '../model/constants';
import { getMultiplierColorTier, type LandedBucket } from '../model/plinkoHelpers';

interface Props {
  multipliers: readonly number[];
  landedBucket: LandedBucket | null;
}

export function MultiplierRow({ multipliers, landedBucket }: Props) {
  return (
    <div className="flex w-full items-center justify-center gap-px px-0.5 sm:gap-1.5 sm:px-4">
      {multipliers.map((value, index) => {
        const isLanded = landedBucket?.bucket === index;
        return (
          <span
            key={isLanded ? `${index}-${landedBucket.hitAt}` : `${index}-${value}`}
            className={cn(
              'flex h-[20px] min-w-0 flex-1 items-center justify-center rounded-md px-0 text-[7px] font-semibold uppercase text-plinko-multiplier-text truncate sm:h-[30px] sm:rounded-lg sm:px-1 sm:text-[11px]',
              TIER_BG_CLASS[getMultiplierColorTier(index, multipliers.length)],
              isLanded && 'animate-plinko-bucket-land'
            )}
          >
            {value}
            <span className="hidden sm:inline">x</span>
          </span>
        );
      })}
    </div>
  );
}
