'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, User as ProfileIcon } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { BurgerIcon } from '@/shared/ui/burger-icon';
import { useSidebar } from '@/shared/ui/sidebar';
import { useUserQuery } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import { BOTTOM_NAV_LABELS, ARIA_LABEL_BOTTOM_NAV } from '../model/constants';

export function BottomNav() {
  const { toggleSidebar, isSmallMobile } = useSidebar();
  const { data: user } = useUserQuery();
  const pathname = usePathname();
  const isProfileActive = pathname === ROUTES.PROFILE;

  if (!isSmallMobile || !user) {
    return null;
  }

  return (
    <nav
      aria-label={ARIA_LABEL_BOTTOM_NAV}
      className="app-bottom-nav fixed bottom-0 left-0 w-full h-16 bg-brand-bg border-t border-brand-border flex items-center justify-around z-50"
    >
      <Button
        variant="ghost"
        size="none"
        className="flex flex-col items-center justify-center gap-1 h-full flex-1 rounded-none text-brand-text-white hover:bg-muted/50 cursor-pointer"
        onClick={toggleSidebar}
        aria-label={BOTTOM_NAV_LABELS.MENU}
      >
        <BurgerIcon className="w-5 h-5" />
        <span className="text-xs">{BOTTOM_NAV_LABELS.MENU}</span>
      </Button>
      <Button
        variant="ghost"
        size="none"
        disabled
        className="flex flex-col items-center justify-center gap-1 h-full flex-1 rounded-none text-brand-text-white"
        aria-label={BOTTOM_NAV_LABELS.NOTIFICATIONS}
      >
        <Bell className="w-5 h-5" />
        <span className="text-xs">{BOTTOM_NAV_LABELS.NOTIFICATIONS}</span>
      </Button>
      <Link
        href={ROUTES.PROFILE}
        aria-label={BOTTOM_NAV_LABELS.PROFILE}
        className={cn(
          'flex flex-col items-center justify-center gap-1 h-full flex-1 text-brand-text-white',
          isProfileActive && 'text-brand'
        )}
      >
        <ProfileIcon className="w-5 h-5" />
        <span className="text-xs">{BOTTOM_NAV_LABELS.PROFILE}</span>
      </Link>
    </nav>
  );
}
