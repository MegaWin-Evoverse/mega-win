import { TotalRewardsCounter } from './TotalRewardsCounter';

const TITLE_TEXT = 'TOTAL REWARDS GIVEN BACK!';
const SUBTITLE_TEXT = 'to the Mega Win community!';
const ARIA_REGION_LABEL = 'Total rewards summary';

export function TotalRewards() {
  return (
    <section
      role="region"
      aria-label={ARIA_REGION_LABEL}
      className="
        relative w-full overflow-hidden border-t border-brand-border rounded-xl bg-total-rewards select-none
        min-h-[120.48px] flex flex-col md:flex-row md:flex-nowrap justify-between items-start md:items-center
        py-4 px-4 pl-[20px] sm:pl-[72px] md:py-4 md:pr-4 md:pl-[88px] lg:py-8 lg:pr-8 lg:pl-[100px] gap-6 md:gap-4 lg:gap-0
      "
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/75 to-transparent opacity-[0.02] backdrop-blur-[5.56px] scale-y-[-1] pointer-events-none z-0" />
      <div className="absolute md:hidden w-[291px] h-[94px] left-[-128px] top-[112px] bg-total-rewards-glow blur-[50px] pointer-events-none z-0" />
      <div className="relative z-10 flex flex-col justify-center gap-[2px] md:gap-1 shrink min-w-0">
        <h2 className="font-outfit text-[20px] md:text-[22px] lg:text-[28px] font-black uppercase text-text-brand leading-[25px] md:leading-none tracking-normal whitespace-normal">
          {TITLE_TEXT}
        </h2>
        <p className="font-sans text-[14px] lg:text-base font-medium text-text-secondary leading-[18px] lg:leading-7 tracking-normal lining-nums proportional-nums">
          {SUBTITLE_TEXT}
        </p>
      </div>

      <TotalRewardsCounter />
    </section>
  );
}
