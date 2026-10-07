'use client';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

interface IndicatorRect {
  left: number;
  width: number;
}

export function useSegmentedIndicator<T extends string>(activeValue: T, tabCount: number) {
  const tabRefs = useRef(new Map<T, HTMLElement>());
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null);

  const registerTab = useCallback(
    (value: T) => (node: HTMLElement | null) => {
      if (node) tabRefs.current.set(value, node);
      else tabRefs.current.delete(value);
    },
    []
  );

  useLayoutEffect(() => {
    function measure() {
      const activeTab = tabRefs.current.get(activeValue);
      if (!activeTab) return;
      setIndicator({ left: activeTab.offsetLeft, width: activeTab.offsetWidth });
    }
    measure();
    const observer = new ResizeObserver(measure);
    tabRefs.current.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [activeValue, tabCount]);

  return { indicator, registerTab };
}
