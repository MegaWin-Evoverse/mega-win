import Link from 'next/link';
import { Headset } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { SidebarFooter } from '@/shared/ui/sidebar';
import { ROUTES } from '@/shared/config';
import { SIDEBAR_FOOTER_LABELS } from '../model/constants';

interface Props {
  isCollapsed: boolean;
}

export function SidebarFooterSection({ isCollapsed }: Props) {
  return (
    <SidebarFooter className="border-t border-border-default p-0">
      <Link
        href={ROUTES.SUPPORT}
        aria-label={SIDEBAR_FOOTER_LABELS.SUPPORT}
        className={cn(
          'flex flex-row items-center gap-2 text-brand-text-white transition-all duration-200 hover:bg-border-default/60 w-full h-20 rounded-none',
          isCollapsed ? 'justify-center' : 'justify-start px-4'
        )}
      >
        <Headset className="w-5 h-5 flex-shrink-0 text-brand-text-white" />
        {!isCollapsed && (
          <span className="font-outfit font-medium text-lg leading-6 text-brand-text-white lining-nums proportional-nums">
            {SIDEBAR_FOOTER_LABELS.SUPPORT}
          </span>
        )}
      </Link>
    </SidebarFooter>
  );
}
