'use client';

import { cn } from '@/shared/lib/cn';
import { CHIP_NOMINALS, parseChipValue } from '@/features/roulette-controls';

import { ChipIcon } from './ChipIcon';

interface Props {
  selectedChip: string | null;
  balance: number;
  onChipSelect: (chip: string) => void;
  className?: string;
}

export function ChipsGrid({ selectedChip, balance, onChipSelect, className }: Props) {
  return (
    <div
      className={cn(
        'flex w-full overflow-x-auto gap-2.5 pb-2 lg:pb-0 lg:overflow-x-visible lg:grid lg:grid-cols-5 lg:gap-4 scrollbar-none',
        className
      )}
    >
      {CHIP_NOMINALS.map((nominal) => (
        <ChipIcon
          key={nominal}
          valueText={nominal}
          isActive={selectedChip === nominal}
          canSelect={parseChipValue(nominal) <= balance}
          onClick={() => onChipSelect(nominal)}
        />
      ))}
    </div>
  );
}
