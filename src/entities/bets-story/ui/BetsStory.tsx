'use client';
import { useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { BetsList } from './BetsList';
import { useBetsStoryQuery } from '@/entities/bets-story/model/useBetsStoryQuery';
import { BETS_STORY_LIVE_TITLE, LIVE_TAB_PATHS, TAB_LABELS, TAB_PATHS } from '../model/constants';
import type { Path } from '../model/types';

interface Props {
  showLiveTitle?: boolean;
}

export function BetsStory({ showLiveTitle = false }: Props = {}) {
  const [activePath, setActivePath] = useState<Path>('latest');
  const { data: bets = [] } = useBetsStoryQuery(activePath);
  const tabPaths = showLiveTitle ? LIVE_TAB_PATHS : TAB_PATHS;
  const tabItems = tabPaths.map((path) => ({ value: path, label: TAB_LABELS[path] }));

  return (
    <div className="w-full max-w-[1000px] flex flex-col gap-4">
      <div
        className={cn(
          'flex w-full items-center',
          showLiveTitle ? 'justify-between' : 'justify-start'
        )}
      >
        {showLiveTitle && (
          <h2 className="shrink-0 whitespace-nowrap font-outfit font-semibold text-2xl text-brand-text-white">
            {BETS_STORY_LIVE_TITLE}
          </h2>
        )}
        <SegmentedTabs
          items={tabItems}
          value={activePath}
          onValueChange={setActivePath}
          className="hidden sm:flex w-auto"
        />
        <Select
          items={TAB_LABELS}
          value={activePath}
          onValueChange={(value) => setActivePath(value as Path)}
        >
          <SelectTrigger
            className={cn(
              'game-tab-active sm:hidden gap-2 rounded-lg border-transparent px-4 py-6 font-outfit text-base leading-5 font-medium text-brand-text-white',
              showLiveTitle ? 'w-auto' : 'w-full'
            )}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tabPaths.map((path) => (
              <SelectItem key={path} value={path}>
                {TAB_LABELS[path]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <BetsList key={activePath} bets={bets} className="animate-in fade-in-0 duration-300" />
    </div>
  );
}
