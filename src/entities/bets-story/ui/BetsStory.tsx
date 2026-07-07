'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { BetsList } from './BetsList';
import { useBetsStoryQuery } from '@/entities/bets-story/model/useBetsStoryQuery';
import { BETS_STORY_EMPTY_MESSAGE, TAB_LABELS, TAB_PATHS } from '../model/constants';
import type { Path } from '../model/types';

interface Props {
  className?: string;
}

export function BetsStory({ className }: Props) {
  const [activePath, setActivePath] = useState<Path>('latest');
  const { data: bets = [] } = useBetsStoryQuery(activePath);

  return (
    <div className={cn('w-full flex flex-col gap-4', className)}>
      <div className="flex w-full items-center justify-start">
        <SegmentedTabs
          items={TAB_PATHS.map((path) => ({ value: path, label: TAB_LABELS[path] }))}
          value={activePath}
          onValueChange={setActivePath}
          className="hidden sm:flex w-auto"
        />
        <Select
          items={TAB_LABELS}
          value={activePath}
          onValueChange={(value) => setActivePath(value as Path)}
        >
          <SelectTrigger className="game-tab-active sm:hidden gap-2 rounded-lg border-transparent px-4 py-6 font-outfit text-base leading-5 font-medium text-brand-text-white w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TAB_PATHS.map((path) => (
              <SelectItem key={path} value={path}>
                {TAB_LABELS[path]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {bets.length > 0 ? (
        <BetsList key={activePath} bets={bets} className="animate-in fade-in-0 duration-300" />
      ) : (
        <div className="py-12 text-center text-sm text-muted-foreground">
          {BETS_STORY_EMPTY_MESSAGE}
        </div>
      )}
    </div>
  );
}
