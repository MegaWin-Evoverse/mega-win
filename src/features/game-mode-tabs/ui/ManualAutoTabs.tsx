'use client';
import { cn } from '@/shared/lib/cn';
import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { GAME_PANEL_TAB, GAME_PANEL_LABELS } from '@/shared/config';
import { useGameModeTabs } from '../model/useGameModeTabs';

const MANUAL_AUTO_TABS = [
  { value: GAME_PANEL_TAB.MANUAL, label: GAME_PANEL_LABELS.MANUAL },
  { value: GAME_PANEL_TAB.AUTO, label: GAME_PANEL_LABELS.AUTO },
];

interface Props {
  className?: string;
}

export function ManualAutoTabs({ className }: Props) {
  const { activeTab, setTab } = useGameModeTabs();

  return (
    <SegmentedTabs
      items={MANUAL_AUTO_TABS}
      value={activeTab}
      onValueChange={setTab}
      className={cn('order-last lg:order-none', className)}
    />
  );
}
