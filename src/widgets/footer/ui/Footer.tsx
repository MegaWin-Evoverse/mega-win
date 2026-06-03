import { cn } from "@/shared/lib/cn";
import { FOOTER_ARIA } from "@/shared/config";
import { FooterBrand } from "./FooterBrand";
import { FooterNav } from "./FooterNav";
import { FooterSocials } from "./FooterSocials";
import { FooterCopyright } from "./FooterCopyright";

interface Props {
  className?: string;
}

export function Footer({ className }: Props) {
  return (
    <footer
      role="contentinfo"
      aria-label={FOOTER_ARIA.FOOTER}
      className={cn(
        "w-full bg-brand-bg border-t border-brand-border py-[28px] px-[32px] flex flex-col items-center justify-center shrink-0",
        className
      )}
    >
      <div className="w-full max-w-[1292px] flex flex-col gap-[34px]">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-10 pb-6 border-b border-brand-border/20">
          <FooterBrand className="flex flex-col items-start gap-[24px] shrink-0" />
          <div className="w-full sm:w-auto flex flex-row justify-between sm:justify-end items-start gap-12 sm:gap-16 lg:gap-24">
            <FooterNav className="flex flex-col items-start gap-[16px] min-w-[105px]" />
            <FooterSocials className="flex flex-col items-start gap-[16px] min-w-[150px] sm:min-w-[212px]" />
          </div>
        </div>
        <FooterCopyright className="w-full bg-page-bg border border-brand-border/30 rounded-[16px] p-6" />
      </div>
    </footer>
  );
}
