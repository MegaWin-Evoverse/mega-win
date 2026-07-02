'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Logo } from '@/shared/ui/logo';

const LOGO_DURATION_S = 1.2;
const OVERLAY_FADE_DELAY_S = 0.45;
const OVERLAY_FADE_DURATION_S = 0.75;
const CONTENT_ENTER_DELAY_S = 0.45;
const CONTENT_ENTER_DURATION_S = 0.75;
const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  children: ReactNode;
}

export function PageTransition({ children }: Props) {
  const pathname = usePathname();

  return (
    <motion.div key={pathname} className="flex-1 flex flex-col">
      <motion.div
        className="fixed inset-0 z-[200] bg-background pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: OVERLAY_FADE_DURATION_S,
          ease: 'easeOut',
          delay: OVERLAY_FADE_DELAY_S,
        }}
      />
      <motion.div
        className="fixed inset-0 z-[201] flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.95] }}
        transition={{ duration: LOGO_DURATION_S, times: [0, 0.3, 0.65, 1] }}
      >
        <Logo size="lg" />
      </motion.div>
      <motion.div
        className="flex-1 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: CONTENT_ENTER_DURATION_S,
          delay: CONTENT_ENTER_DELAY_S,
          ease: EASE_OUT_EXPO,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
