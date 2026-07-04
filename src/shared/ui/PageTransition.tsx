'use client';
import { useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Logo } from '@/shared/ui/logo';

const LOGO_DURATION_S = 1.2;
const OVERLAY_FADE_DELAY_S = 0.45;
const OVERLAY_FADE_DURATION_S = 0.75;
const CONTENT_ENTER_DELAY_S = 0.45;
const CONTENT_ENTER_DURATION_S = 0.75;

interface Props {
  children: ReactNode;
}

export function PageTransition({ children }: Props) {
  const pathname = usePathname();

  return <TransitionShell key={pathname}>{children}</TransitionShell>;
}

function TransitionShell({ children }: Props) {
  const [isIntroDone, setIsIntroDone] = useState<boolean>(false);

  return (
    <div className="flex-1 flex flex-col">
      {!isIntroDone && (
        <>
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
            onAnimationComplete={() => setIsIntroDone(true)}
          >
            <Logo size="lg" />
          </motion.div>
        </>
      )}
      <motion.div
        className="flex-1 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: CONTENT_ENTER_DURATION_S,
          delay: CONTENT_ENTER_DELAY_S,
          ease: 'easeOut',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
