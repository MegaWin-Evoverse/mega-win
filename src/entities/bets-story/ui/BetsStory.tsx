'use client';
import { useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { BetsList } from './BetsList';
import { useBetsStoryQuery } from '@/entities/bets-story/model/useBetsStoryQuery';
import { TAB_LABELS, TAB_PATHS } from '../model/constants';
import type { Path } from '../model/types';

interface Props {
  className?: string;
}

export function BetsStory({ className }: Props) {
  const [activePath, setActivePath] = useState<Path>('latest');
  const { data: bets = [] } = useBetsStoryQuery(activePath);

  return (
    <div className={cn('bets-story w-full', className)}>
      <SegmentedTabs
        items={TAB_PATHS.map((path) => ({ value: path, label: TAB_LABELS[path] }))}
        value={activePath}
        onValueChange={setActivePath}
      />
      <BetsList bets={bets} />
    </div>
  );
}
