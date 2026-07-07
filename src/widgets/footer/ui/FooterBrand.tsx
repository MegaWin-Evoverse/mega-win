import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/shared/ui/logo';
import { ROUTES, FOOTER_ARIA } from '@/shared/config';
import eighteenPlusIcon from '../assets/icons/18-plus.svg';

interface Props {
  className?: string;
}

export function FooterBrand({ className }: Props) {
  return (
    <div className={className}>
      <Link
        href={ROUTES.HOME}
        aria-label={FOOTER_ARIA.LOGO_LINK}
        className="w-[150px] h-[79px] flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
      >
        <Logo size="lg" className="w-full h-full" />
      </Link>

      <Image
        src={eighteenPlusIcon}
        alt="18+ Gamble Responsibly"
        width={150}
        height={41}
        className="w-[150px] h-[41px] select-none"
      />
    </div>
  );
}
