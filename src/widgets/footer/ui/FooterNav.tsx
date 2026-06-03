import Link from "next/link";
import { FOOTER_ABOUT_LINKS, FOOTER_HEADERS } from "@/shared/config";

interface Props {
  className?: string;
}

export function FooterNav({ className }: Props) {
  return (
    <div className={className}>
      <h3 className="font-outfit font-medium text-base text-brand-text-white uppercase tracking-wider">
        {FOOTER_HEADERS.ABOUT}
      </h3>
      <ul className="flex flex-col items-start gap-[10px]">
        {FOOTER_ABOUT_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="font-outfit font-light text-sm text-brand-text-light hover:text-brand-text-white transition-colors duration-200 focus-visible:outline-none focus-visible:underline rounded"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
