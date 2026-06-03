import { SidebarGroup } from "@/shared/ui/sidebar";
import { DailyClaimerCard } from "./DailyClaimerCard";
import { DailyClaimerCardCollapsed } from "./DailyClaimerCardCollapsed";

export function SidebarHeaderSection() {
  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden px-4 pt-6 pb-0">
        <DailyClaimerCard />
      </SidebarGroup>

      <SidebarGroup className="hidden items-center justify-center group-data-[collapsible=icon]:flex px-4 pt-6 pb-0">
        <DailyClaimerCardCollapsed />
      </SidebarGroup>
    </>
  );
}
