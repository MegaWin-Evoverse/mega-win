import { COPYRIGHT_TEXT } from '@/shared/config';

interface Props {
  className?: string;
}

export function FooterCopyright({ className }: Props) {
  return (
    <div className={className}>
      <p className="font-outfit font-light text-xs text-brand-text-muted leading-relaxed text-left select-text">
        {COPYRIGHT_TEXT}
      </p>
    </div>
  );
}
