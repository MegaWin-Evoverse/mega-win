'use client';
import { cn } from '@/shared/lib/cn';
import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { GAME_PANEL_TAB, type GamePanelTab, GAME_PANEL_LABELS } from '@/shared/config';

const MANUAL_AUTO_TABS = [
  { value: GAME_PANEL_TAB.MANUAL, label: GAME_PANEL_LABELS.MANUAL },
  { value: GAME_PANEL_TAB.AUTO, label: GAME_PANEL_LABELS.AUTO },
];

interface Props {
  activeTab: GamePanelTab;
  onTabChange: (tab: GamePanelTab) => void;
  className?: string;
}

export function ManualAutoTabs({ activeTab, onTabChange, className }: Props) {
  return (
    <SegmentedTabs
      items={MANUAL_AUTO_TABS}
      value={activeTab}
      onValueChange={onTabChange}
      className={cn('order-last lg:order-none', className)}
    />
  );
}
