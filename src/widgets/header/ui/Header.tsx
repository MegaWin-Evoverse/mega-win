import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Logo } from '@/shared/ui/logo';
import { ROUTES, BUTTON_LABELS } from '@/shared/config';

interface Props {
  onButtonClick?: () => void;
}

const ARIA_LABEL_HEADER = 'Main header';
const ARIA_LABEL_BUTTON = 'Play game';
const ARIA_LABEL_LOGO_LINK = 'Go to homepage';

export function Header({ onButtonClick }: Props) {
  return (
    <header
      role="banner"
      aria-label={ARIA_LABEL_HEADER}
      className="w-full h-16 bg-brand-bg border-b border-brand-border px-8 py-3 flex items-center justify-between z-50 shrink-0"
    >
      <Link href={ROUTES.HOME} aria-label={ARIA_LABEL_LOGO_LINK} className="flex shrink-0">
        <Logo />
      </Link>

      <Button
        variant="main"
        onClick={onButtonClick}
        aria-label={ARIA_LABEL_BUTTON}
        className="w-[120px] h-10 py-3 px-4 rounded-lg flex items-center justify-center gap-2"
      >
        {BUTTON_LABELS.LOG}
      </Button>
    </header>
  );
}
