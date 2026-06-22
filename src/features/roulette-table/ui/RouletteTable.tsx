'use client';

import { cn } from '@/shared/lib/cn';
import { useBettingTable } from '../model/useBettingTable';
import { RouletteTableHorizontal } from './RouletteTableHorizontal';
import { RouletteTablePortrait } from './RouletteTablePortrait';

interface Props {
  className?: string;
}

export function RouletteTable({ className }: Props) {
  const handlers = useBettingTable();

  return (
    <>
      <RouletteTablePortrait {...handlers} className={cn('sm:hidden', className)} />
      <RouletteTableHorizontal {...handlers} className={cn('hidden sm:block', className)} />
    </>
  );
}
