'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  triggerOn?: 'mount' | 'view';
  delay?: number;
  className?: string;
}

const REVEAL_HIDDEN = { opacity: 0, y: 24 };
const REVEAL_VISIBLE = { opacity: 1, y: 0 };
const REVEAL_DURATION = 0.6;
const REVEAL_EASE = 'easeOut' as const;
const REVEAL_VIEWPORT_AMOUNT = 0.2;

export function RevealOnScroll({ children, triggerOn = 'view', delay = 0, className }: Props) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const transition = { duration: REVEAL_DURATION, delay, ease: REVEAL_EASE };

  if (triggerOn === 'mount') {
    return (
      <motion.div
        initial={REVEAL_HIDDEN}
        animate={REVEAL_VISIBLE}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={REVEAL_HIDDEN}
      whileInView={REVEAL_VISIBLE}
      viewport={{ once: true, amount: REVEAL_VIEWPORT_AMOUNT }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
