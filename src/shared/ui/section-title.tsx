import { type ReactNode } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { cn } from '@/shared/lib/cn';

interface Props {
  title: string;
  icon?: ReactNode;
  iconSrc?: StaticImageData;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
}

export function SectionTitle({ title, icon, iconSrc, iconWidth, iconHeight, className }: Props) {
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
      <h2 className="font-outfit font-semibold text-[20px] leading-[28px] text-brand-text-white tracking-normal select-none">
        {title}
      </h2>
    </div>
  );
}
