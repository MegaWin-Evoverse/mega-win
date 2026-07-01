import { useState, useCallback, useRef, type RefCallback } from 'react';

interface UseSidebarMenuReturn {
  isGamesOpen: boolean;
  onGamesToggle: () => void;
  gamesContentRef: RefCallback<HTMLDivElement>;
  gamesContentHeight: number;
}

export function useSidebarMenu(): UseSidebarMenuReturn {
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [gamesContentHeight, setGamesContentHeight] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);
  const onGamesToggle = useCallback(() => setIsGamesOpen((prev) => !prev), []);

  const gamesContentRef = useCallback((element: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      setGamesContentHeight(entries[0].contentRect.height);
    });
    observer.observe(element);
    observerRef.current = observer;
  }, []);

  return { isGamesOpen, onGamesToggle, gamesContentRef, gamesContentHeight };
}
