import Link from 'next/link';
import { buttonVariants } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';
import { SOCIAL_LINKS, FOOTER_HEADERS, FOOTER_ARIA } from '@/shared/config';
import { getSocialIcon } from '../lib/getSocialIcon';

interface Props {
  className?: string;
}

export function FooterSocials({ className }: Props) {
  return (
    <div className={className}>
      <h3 className="font-outfit font-medium text-base text-brand-text-white uppercase tracking-wider">
        {FOOTER_HEADERS.SOCIALS}
      </h3>
      <div className="flex flex-row flex-wrap items-center gap-2">
        {SOCIAL_LINKS.map((social) => {
          const Icon = getSocialIcon(social.icon);
          return (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${FOOTER_ARIA.SOCIAL_LINK_PREFIX}${social.label}`}
              className={cn(
                buttonVariants({ size: 'icon' }),
                'w-9 h-9 bg-brand-border hover:bg-brand-border/80 border-0 rounded-lg text-brand-text-light hover:text-brand-text-white transition-all flex items-center justify-center p-2'
              )}
            >
              <Icon className="size-5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
