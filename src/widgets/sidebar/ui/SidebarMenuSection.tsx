import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/shared/ui/sidebar";
import { SIDEBAR_MENU_ITEMS } from "../model/menu";
import { MenuIcon } from "./MenuIcon";
import { CaretIcon } from "./CaretIcon";

interface Props {
  isCollapsed: boolean;
  isGamesOpen: boolean;
  onGamesToggle: () => void;
}

const MENU_BTN_BASE =
  'sidebar-menu-btn-custom text-brand-text-white font-outfit font-medium text-base lining-nums proportional-nums transition-all duration-200 w-full';

const MENU_BTN_COLLAPSED =
  'group-data-[collapsible=icon]:size-auto! flex items-center justify-center p-0 group-data-[collapsible=icon]:p-0! h-[52px] group-data-[collapsible=icon]:h-[52px]!';

export function SidebarMenuSection({ isCollapsed, isGamesOpen, onGamesToggle }: Props) {
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
                  <div className="flex items-center gap-2">
                    <MenuIcon name={item.iconName} className="flex-shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <CaretIcon isOpen={isGamesOpen} className="text-brand-text-white w-6 h-6" />
                  )}
                </SidebarMenuButton>
                {!isCollapsed && (
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                      isGamesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-2">
                        {item.subItems && (
                          <SidebarMenuSub className="flex flex-col gap-2 pl-4 border-l-0 ml-0 py-0">
                            {item.subItems.map((sub) => (
                              <SidebarMenuSubItem key={sub.label}>
                                <SidebarMenuSubButton
                                  render={
                                    <Link
                                      href={sub.href}
                                      className="flex items-center gap-2 text-brand-text-white hover:text-brand-text-light py-2 px-3 rounded-md transition-colors duration-150 font-outfit font-medium text-base lining-nums proportional-nums"
                                    />
                                  }
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
                  </div>
                )}
              </SidebarMenuItem>
            );
          }
          return (
            <SidebarMenuItem key={item.label} className="w-full">
              <SidebarMenuButton
                render={<Link href={item.href} className="flex items-center gap-2" />}
                className={cn(
                  MENU_BTN_BASE,
                  isCollapsed
                    ? MENU_BTN_COLLAPSED
                    : 'h-11 px-4 py-3 flex items-center gap-2'
                )}
              >
                <MenuIcon name={item.iconName} className="flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
