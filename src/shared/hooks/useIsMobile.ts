import { useState, useEffect } from 'react';

const SMALL_MOBILE_BREAKPOINT = 640;
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useIsMobile() {
  const [isSmallMobile, setIsSmallMobile] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    const smallMobileMql = window.matchMedia(`(max-width: ${SMALL_MOBILE_BREAKPOINT - 1}px)`);
    const mobileMql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const tabletMql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);

    const onChange = () => {
      const mobileMatches = mobileMql.matches;
      setIsSmallMobile(smallMobileMql.matches);
      setIsMobile(mobileMatches);
      setIsTablet(tabletMql.matches && !mobileMatches);
    };

    smallMobileMql.addEventListener('change', onChange);
    mobileMql.addEventListener('change', onChange);
    tabletMql.addEventListener('change', onChange);
    onChange();

    return () => {
      smallMobileMql.removeEventListener('change', onChange);
      mobileMql.removeEventListener('change', onChange);
      tabletMql.removeEventListener('change', onChange);
    };
  }, []);

  return { isSmallMobile, isMobile, isTablet };
}
