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
    icons={{
      success: <CircleCheckIcon className="size-5" />,
      info: <InfoIcon className="size-5" />,
      warning: <TriangleAlertIcon className="size-5" />,
      error: <OctagonXIcon className="size-5" />,
      loading: <Loader2Icon className="size-5 animate-spin" />,
    }}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast:
          'flex items-center gap-3 w-full rounded-xl border p-4 text-base font-outfit font-medium shadow-lg',
        default: 'bg-popover text-popover-foreground border-border',
        success:
          'bg-gradient-to-b from-brand-green-from to-brand-green-to text-brand-dark border-transparent',
        error: 'bg-destructive text-brand-text-white border-transparent',
        warning: 'bg-popover text-popover-foreground border-border',
        info: 'bg-popover text-popover-foreground border-border',
        title: 'font-semibold',
        description: 'opacity-90 text-sm',
      },
    }}
    style={
      {
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
        '--border-radius': 'var(--radius-xl)',
      } as CSSProperties
    }
    {...props}
  />
);

export { Toaster };
