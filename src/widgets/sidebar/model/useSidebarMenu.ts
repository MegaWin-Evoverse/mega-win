import { useState, useCallback } from 'react';

interface UseSidebarMenuReturn {
  isGamesOpen: boolean;
  onGamesToggle: () => void;
}

export function useSidebarMenu(): UseSidebarMenuReturn {
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const onGamesToggle = useCallback(() => setIsGamesOpen((prev) => !prev), []);
  return { isGamesOpen, onGamesToggle };
}
