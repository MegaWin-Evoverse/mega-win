'use client';
import { cn } from '@/shared/lib/cn';
import { CHIP_NOMINALS } from '@/entities/game';
import { useChipSelector } from '../model/useChipSelector';
import { ChipIcon } from './ChipIcon';

interface Props {
  className?: string;
}

export function ChipsGrid({ className }: Props) {
  const { selectedChip, selectChip } = useChipSelector();

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
          onClick={() => selectChip(nominal)}
        />
      ))}
    </div>
  );
}
