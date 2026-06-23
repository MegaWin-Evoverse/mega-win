import type { ReactNode } from 'react';
import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';
import { cn } from '@/shared/lib/cn';

interface Props {
  title: string;
  href?: string;
  icon?: ReactNode;
  iconSrc?: StaticImageData;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
}

export function SectionTitle({
  title,
  href,
  icon,
  iconSrc,
  iconWidth,
  iconHeight,
  className,
}: Props) {
  const titleClassName =
    'font-outfit font-semibold text-[20px] leading-[28px] text-brand-text-white tracking-normal select-none';

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {icon
        ? icon
        : iconSrc && (
            <Image
              src={iconSrc}
              width={iconWidth}
              height={iconHeight}
              alt=""
              className="shrink-0"
              priority
            />
          )}
      <h2 className={titleClassName}>
        {href ? (
          <Link href={href} className="hover:text-brand-text-light">
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
    </div>
  );
}
