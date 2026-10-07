'use client';
import { SidebarGroup } from '@/shared/ui/sidebar';
import { useDailyClaim } from '@/features/daily-claim';
import { DailyClaimerCard } from './DailyClaimerCard';
import { DailyClaimerCardCollapsed } from './DailyClaimerCardCollapsed';

export function SidebarHeaderSection() {
  const dailyClaim = useDailyClaim();

  return (
    <>
      {dailyClaim.uiState !== 'hidden' && (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden px-4 pt-6 pb-0">
          <DailyClaimerCard {...dailyClaim} />
        </SidebarGroup>
      )}
      <SidebarGroup className="hidden items-center justify-center group-data-[collapsible=icon]:flex px-4 pt-6 pb-0">
        <DailyClaimerCardCollapsed />
      </SidebarGroup>
    </>
  );
}
