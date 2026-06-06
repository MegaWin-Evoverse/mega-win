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
import { useSidebarMenu } from '../model/useSidebarMenu';

import { SidebarHeaderSection } from './SidebarHeaderSection';
import { SidebarMenuSection } from './SidebarMenuSection';
import { SidebarFooterSection } from './SidebarFooterSection';

interface Props extends ComponentProps<typeof BaseSidebar> {
  onSupportClick?: () => void;
}

export function Sidebar({
  className,
  children,
  collapsible = 'icon',
  onSupportClick,
  ...props
}: Props) {
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const { isGamesOpen, onGamesToggle } = useSidebarMenu();

  return (
    <BaseSidebar
      collapsible={collapsible}
      className={cn(
        'border-r border-border-default md:fixed md:top-16 md:bottom-0 md:h-auto',
        className
      )}
      {...props}
    >
      {!isMobile && <SidebarTrigger className="absolute left-full top-6 ml-2 z-50" />}
      <SidebarContent>
        <SidebarHeaderSection />
        <SidebarMenuSection
          isCollapsed={isCollapsed}
          isGamesOpen={isGamesOpen}
          onGamesToggle={onGamesToggle}
        />
        {children}
      </SidebarContent>
      <SidebarFooterSection isCollapsed={isCollapsed} onSupportClick={onSupportClick} />
      <SidebarRail />
    </BaseSidebar>
  );
}
