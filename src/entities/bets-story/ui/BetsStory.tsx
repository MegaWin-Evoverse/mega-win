'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { BetsList } from './BetsList';
import { useBetsStoryQuery } from '../model/useBetsStoryQuery';
import { TAB_LABELS, TAB_PATHS } from '../model/constants';
import type { Path } from '../model/types';

export function BetsStory() {
  const [activePath, setActivePath] = useState<Path>('latest');
  const { data: bets = [] } = useBetsStoryQuery(activePath);

  return (
    <Tabs
      className="w-full max-w-[1000px]"
      value={activePath}
      onValueChange={(value) => setActivePath(value as Path)}
    >
      <TabsList variant="bets">
        {TAB_PATHS.map((path) => (
          <TabsTrigger key={path} value={path}>
            {TAB_LABELS[path]}
          </TabsTrigger>
        ))}
      </TabsList>
      {TAB_PATHS.map((path) => (
        <TabsContent key={path} value={path}>
          <BetsList bets={bets} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
