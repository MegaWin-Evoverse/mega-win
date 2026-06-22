'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { useState } from 'react';
import { cn } from '@/shared/lib/cn';
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
    <Tabs
      className={cn('bets-story w-full max-w-[1000px]', className)}
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
