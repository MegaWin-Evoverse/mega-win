import { useState, useCallback, useRef, type RefCallback } from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';
import { GAMES_DROPDOWN_BOTTOM_BUFFER } from './constants';

interface UseSidebarMenuReturn {
  isGamesOpen: boolean;
  onGamesToggle: () => void;
  gamesContentRef: RefCallback<HTMLDivElement>;
  gamesContentHeight: number;
  isGamesActive: boolean;
  isItemActive: (href: string) => boolean;
}

export function useSidebarMenu(): UseSidebarMenuReturn {
  const pathname = usePathname();
  const isGamesActive = pathname.startsWith(ROUTES.GAMES);
  const [isGamesOpen, setIsGamesOpen] = useState(isGamesActive);
  const [gamesContentHeight, setGamesContentHeight] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [prevGamesActive, setPrevGamesActive] = useState(isGamesActive);
  const onGamesToggle = useCallback(() => setIsGamesOpen((prev) => !prev), []);

  if (isGamesActive !== prevGamesActive) {
    setPrevGamesActive(isGamesActive);
    if (isGamesActive) setIsGamesOpen(true);
  }
  const isItemActive = useCallback((href: string) => pathname === href, [pathname]);

  const gamesContentRef = useCallback((element: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      setGamesContentHeight(entries[0].contentRect.height + GAMES_DROPDOWN_BOTTOM_BUFFER);
    });
    observer.observe(element);
    observerRef.current = observer;
  }, []);

  return {
    isGamesOpen,
    onGamesToggle,
    gamesContentRef,
    gamesContentHeight,
    isGamesActive,
    isItemActive,
  };
}
