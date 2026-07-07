'use client';
import type { CSSProperties } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react';

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    className="toaster group"
    richColors
    icons={{
      success: <CircleCheckIcon className="size-5" />,
      info: <InfoIcon className="size-5" />,
      warning: <TriangleAlertIcon className="size-5" />,
      error: <OctagonXIcon className="size-5" />,
      loading: <Loader2Icon className="size-5 animate-spin" />,
    }}
    toastOptions={{
      classNames: {
        toast: '!p-4 !gap-3 !text-base !font-outfit !font-medium !shadow-lg',
        title: '!font-semibold',
        description: '!opacity-90 !text-sm',
      },
    }}
    style={
      {
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
        '--border-radius': 'var(--radius-xl)',
        '--success-bg': 'linear-gradient(180deg, var(--brand-green-from), var(--brand-green-to))',
        '--success-text': 'var(--brand-dark)',
        '--success-border': 'transparent',
        '--error-bg': 'var(--destructive)',
        '--error-text': 'var(--brand-text-white)',
        '--error-border': 'transparent',
      } as CSSProperties
    }
    {...props}
  />
);

export { Toaster };
