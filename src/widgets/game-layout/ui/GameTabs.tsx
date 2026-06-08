'use client';

import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { GAME_PANEL_LABELS, GAME_PANEL_TAB, type GamePanelTab } from '../config/constants';

interface Props {
  activeTab: GamePanelTab;
  onTabChange: (tab: GamePanelTab) => void;
  className?: string;
}

const TAB_ITEMS = [
  {
    value: GAME_PANEL_TAB.MANUAL,
    label: GAME_PANEL_LABELS.MANUAL,
    className: 'text-brand-text-light aria-pressed:text-brand-text-white',
  },
  {
    value: GAME_PANEL_TAB.AUTO,
    label: GAME_PANEL_LABELS.AUTO,
    className: 'text-brand-text-light aria-pressed:text-brand-text-white',
  },
];

export function GameTabs({ activeTab, onTabChange, className }: Props) {
  return (
    <SegmentedTabs
      items={TAB_ITEMS}
      value={activeTab}
      onValueChange={onTabChange}
      className={className}
    />
  );
}
