import { useState, useCallback, useRef, useEffect, type RefObject } from 'react';

interface UseSidebarMenuReturn {
  isGamesOpen: boolean;
  onGamesToggle: () => void;
  gamesContentRef: RefObject<HTMLDivElement | null>;
  gamesContentHeight: number;
}

export function useSidebarMenu(): UseSidebarMenuReturn {
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [gamesContentHeight, setGamesContentHeight] = useState(0);
  const gamesContentRef = useRef<HTMLDivElement>(null);
  const onGamesToggle = useCallback(() => setIsGamesOpen((prev) => !prev), []);

  useEffect(() => {
    const element = gamesContentRef.current;
    if (!element) return undefined;

    const resizeObserver = new ResizeObserver((entries) => {
      setGamesContentHeight(entries[0].contentRect.height);
    });
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  return { isGamesOpen, onGamesToggle, gamesContentRef, gamesContentHeight };
}
