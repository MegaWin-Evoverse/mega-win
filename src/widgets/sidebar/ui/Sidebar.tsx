'use client';
import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/cn';
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/shared/ui/sidebar';
import { SidebarHeaderSection } from './SidebarHeaderSection';
import { SidebarMenuSection } from './SidebarMenuSection';
import { SidebarFooterSection } from './SidebarFooterSection';

type Props = ComponentProps<typeof BaseSidebar>;

export function Sidebar({ className, children, collapsible = 'icon', ...props }: Props) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <BaseSidebar
      collapsible={collapsible}
      className={cn(
        'border-r border-border-default md:fixed md:top-16 md:bottom-0 md:h-auto',
        className
      )}
      {...props}
    >
      <SidebarTrigger className="absolute left-full top-6 ml-2 z-50" />
      <SidebarContent>
        <SidebarHeaderSection />
        <SidebarMenuSection isCollapsed={isCollapsed} />
        {children}
      </SidebarContent>
      <SidebarFooterSection isCollapsed={isCollapsed} />
      <SidebarRail />
    </BaseSidebar>
  );
}
