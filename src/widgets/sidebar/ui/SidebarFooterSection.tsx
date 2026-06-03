import { Headset } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { SidebarFooter } from "@/shared/ui/sidebar";

interface Props {
  isCollapsed: boolean;
  onSupportClick?: () => void;
}

export function SidebarFooterSection({ isCollapsed, onSupportClick }: Props) {
  return (
    <SidebarFooter className="border-t border-border-default p-0">
      <Button
        variant="ghost"
        size="none"
        onClick={onSupportClick}
        aria-label="Help & Support"
        className={cn(
          "flex flex-row items-center gap-2 text-brand-text-white transition-all duration-200 hover:bg-border-default/60 w-full h-20 rounded-none",
          isCollapsed ? "justify-center" : "justify-start px-4"
        )}
      >
        <Headset className="w-5 h-5 flex-shrink-0 text-brand-text-white" />
        {!isCollapsed && (
          <span className="font-outfit font-medium text-lg leading-6 text-brand-text-white lining-nums proportional-nums">
            Help & Support
          </span>
        )}
      </Button>
    </SidebarFooter>
  );
}
