'use client';
import Link from 'next/link';
import { XIcon } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { BurgerIcon } from '@/shared/ui/burger-icon';
import { Logo } from '@/shared/ui/logo';
import { Skeleton } from '@/shared/ui/skeleton';
import { ROUTES, BUTTON_LABELS } from '@/shared/config';
import { useSidebar } from '@/shared/ui/sidebar';
import { useAuthStore } from '@/features/auth';
import { useUserQuery } from '@/entities/user';
import { BalanceMenu } from './BalanceMenu';
import { UserPanel } from './UserPanel';

const ARIA_LABEL_HEADER = 'Main header';
const ARIA_LABEL_BUTTON = 'Log in';
const ARIA_LABEL_LOGO_LINK = 'Go to homepage';
const ARIA_LABEL_MENU_BUTTON = 'Toggle navigation menu';

export function Header() {
  const { toggleSidebar, isSmallMobile, isMobile, isTablet, openMobile } = useSidebar();
  const openAuthForm = useAuthStore((state) => state.openAuthForm);
  const { data: user, isPending: isUserPending } = useUserQuery();
  const isMobileOrTablet = isMobile || isTablet;

  return (
    <header
      role="banner"
      aria-label={ARIA_LABEL_HEADER}
      className="app-header fixed top-0 left-0 w-full h-16 bg-brand-bg border-b border-brand-border pl-[22px] pr-8 py-3 flex items-center justify-between gap-[15px] z-50 shrink-0"
    >
      <div className="flex items-center gap-2 shrink-0">
        {(isMobileOrTablet && (!isSmallMobile || !user)) || (isSmallMobile && openMobile) ? (
          <Button
            variant="ghost"
            size="none"
            className="w-10 h-10 flex items-center justify-center rounded-lg text-brand-text-white hover:bg-muted/50 cursor-pointer"
            onClick={toggleSidebar}
            aria-label={ARIA_LABEL_MENU_BUTTON}
          >
            <span className="relative flex items-center justify-center w-8 h-8">
              <BurgerIcon
                className={cn(
                  'absolute w-7 h-7 transition-all duration-700 ease-out',
                  isSmallMobile && openMobile
                    ? 'rotate-90 scale-75 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                )}
              />
              <XIcon
                strokeWidth={3}
                className={cn(
                  'absolute w-8 h-8 transition-all duration-700 ease-out',
                  isSmallMobile && openMobile
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-75 opacity-0'
                )}
              />
            </span>
          </Button>
        ) : null}
        <Link href={ROUTES.HOME} aria-label={ARIA_LABEL_LOGO_LINK} className="flex shrink-0">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center justify-end min-w-0">
        {isUserPending ? (
          <Skeleton className="w-[120px] h-10 rounded-lg" />
        ) : user ? (
          isSmallMobile ? (
            <BalanceMenu balances={user.userBalances} />
          ) : (
            <UserPanel user={user} />
          )
        ) : (
          <Button
            variant="main"
            onClick={() => openAuthForm()}
            aria-label={ARIA_LABEL_BUTTON}
            className="w-[120px] h-10 py-3 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            {BUTTON_LABELS.LOG}
          </Button>
        )}
      </div>
    </header>
  );
}
