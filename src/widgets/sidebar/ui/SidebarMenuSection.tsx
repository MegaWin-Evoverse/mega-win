import Link from 'next/link';
import type { CSSProperties } from 'react';
import { cn } from '@/shared/lib/cn';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/shared/ui/sidebar';
import { useSidebarMenu } from '../model/useSidebarMenu';
import { SIDEBAR_MENU_ITEMS } from '../model/menu';
import { MenuIcon } from './MenuIcon';
import { CaretIcon } from './CaretIcon';

interface Props {
  isCollapsed: boolean;
}

const MENU_BTN_BASE =
  'group/menu-btn sidebar-menu-btn-custom text-brand-text-white font-outfit font-medium text-base lining-nums proportional-nums transition-all duration-200 w-full';

const MENU_BTN_COLLAPSED =
  'group-data-[collapsible=icon]:size-auto! flex items-center justify-center p-0 group-data-[collapsible=icon]:p-0! h-[52px] group-data-[collapsible=icon]:h-[52px]!';

const MENU_BTN_CONTENT =
  'flex items-center gap-2 transition-transform duration-500 ease-out group-hover/menu-btn:translate-x-2';

const SUB_MENU_LINK =
  'flex items-center gap-2 w-full h-auto text-brand-text-white hover:text-brand-text-light py-3 pl-6 pr-3 rounded-md transition-all duration-500 ease-out hover:translate-x-2 font-outfit font-medium text-base lining-nums proportional-nums';

export function SidebarMenuSection({ isCollapsed }: Props) {
  const { isGamesOpen, onGamesToggle, gamesContentRef, gamesContentHeight } = useSidebarMenu();

  return (
    <SidebarGroup className="mt-4 px-4 py-0 w-full">
      <SidebarMenu className="flex flex-col gap-2 w-full">
        {SIDEBAR_MENU_ITEMS.map((item) => {
          if (item.isCollapsible) {
            return (
              <SidebarMenuItem key={item.label} className="flex flex-col w-full">
                <SidebarMenuButton
                  onClick={onGamesToggle}
                  className={cn(
                    MENU_BTN_BASE,
                    isCollapsed
                      ? MENU_BTN_COLLAPSED
                      : 'h-11 px-4 py-3 flex items-center justify-between'
                  )}
                >
                  <div className={MENU_BTN_CONTENT}>
                    <MenuIcon name={item.iconName} className="flex-shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <CaretIcon isOpen={isGamesOpen} className="text-brand-text-white w-6 h-6" />
                  )}
                </SidebarMenuButton>
                {!isCollapsed && (
                  <div
                    style={{ '--games-content-height': `${gamesContentHeight}px` } as CSSProperties}
                    className={cn(
                      'overflow-hidden transition-[height,opacity] duration-500 ease-out',
                      isGamesOpen ? 'h-(--games-content-height) opacity-100' : 'h-0 opacity-0'
                    )}
                  >
                    <div ref={gamesContentRef} className="pt-2 pr-3">
                      {item.subItems && (
                        <SidebarMenuSub className="flex flex-col gap-2 translate-x-0 border-l-0 mx-0 px-0 py-0">
                          {item.subItems.map((sub) => (
                            <SidebarMenuSubItem key={sub.label}>
                              <SidebarMenuSubButton
                                render={<Link href={sub.href} className={SUB_MENU_LINK} />}
                              >
                                <MenuIcon name={sub.iconName} className="h-5 w-5 flex-shrink-0" />
                                <span>{sub.label}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </div>
                  </div>
                )}
              </SidebarMenuItem>
            );
          }
          return (
            <SidebarMenuItem key={item.label} className="w-full">
              <SidebarMenuButton
                render={<Link href={item.href} />}
                className={cn(
                  MENU_BTN_BASE,
                  isCollapsed ? MENU_BTN_COLLAPSED : 'h-11 px-4 py-3 flex items-center'
                )}
              >
                <div className={MENU_BTN_CONTENT}>
                  <MenuIcon name={item.iconName} className="flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
