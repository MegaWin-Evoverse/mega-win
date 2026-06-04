import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    const mobileMql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const tabletMql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);

    const onChange = () => {
      const mobileMatches = mobileMql.matches;
      setIsMobile(mobileMatches);
      setIsTablet(tabletMql.matches && !mobileMatches);
    };

    mobileMql.addEventListener('change', onChange);
    tabletMql.addEventListener('change', onChange);
    onChange();

    return () => {
      mobileMql.removeEventListener('change', onChange);
      tabletMql.removeEventListener('change', onChange);
    };
  }, []);

  return { isMobile, isTablet };
}
