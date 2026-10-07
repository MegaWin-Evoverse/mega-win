'use client';
import Link from 'next/link';
import { Headset, LogOut } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/shared/ui/sidebar';
import { ROUTES } from '@/shared/config';
import { useUserQuery } from '@/entities/user';
import { useLogout } from '@/features/auth';
import { SIDEBAR_FOOTER_LABELS } from '../model/constants';
import { MENU_BTN_BASE, MENU_BTN_CONTENT } from './SidebarMenuSection';

interface Props {
  isCollapsed: boolean;
}

export function SidebarFooterSection({ isCollapsed }: Props) {
  const { isSmallMobile } = useSidebar();
  const { data: user } = useUserQuery();
  const { logout, isLoggingOut } = useLogout();

  return (
    <SidebarFooter className="border-t border-border-default p-0">
      <Link
        href={ROUTES.SUPPORT}
        aria-label={SIDEBAR_FOOTER_LABELS.SUPPORT}
        className={cn(
          'flex flex-row items-center gap-2 text-brand-text-white transition-all duration-200 hover:bg-border-default/60 w-full h-20 rounded-none',
          isCollapsed ? 'justify-center' : 'justify-start px-4'
        )}
      >
        <Headset className="w-5 h-5 flex-shrink-0 text-brand-text-white" />
        {!isCollapsed && (
          <span className="font-outfit font-medium text-lg leading-6 text-brand-text-white lining-nums proportional-nums">
            {SIDEBAR_FOOTER_LABELS.SUPPORT}
          </span>
        )}
      </Link>
      {isSmallMobile && user && (
        <SidebarMenu className="w-full px-4 pt-2 pb-4">
          <SidebarMenuItem className="w-full">
            <SidebarMenuButton
              onClick={() => logout()}
              disabled={isLoggingOut}
              aria-label={SIDEBAR_FOOTER_LABELS.LOGOUT}
              className={cn(MENU_BTN_BASE, 'h-11 px-4 py-3 flex items-center')}
            >
              <div className={MENU_BTN_CONTENT}>
                <LogOut className="flex-shrink-0" />
                <span>{SIDEBAR_FOOTER_LABELS.LOGOUT}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      )}
    </SidebarFooter>
  );
}
