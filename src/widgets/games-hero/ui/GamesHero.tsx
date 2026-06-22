import { GAMES_HERO_CONSTANTS } from '../model/constants';

export function GamesHero() {
  return (
    <section
      role="region"
      aria-label={GAMES_HERO_CONSTANTS.SECTION_ARIA_LABEL}
      className="games-hero-bg relative w-full flex flex-col items-center px-4 pt-16 pb-12"
    >
      <div className="w-full max-w-[1133px] mx-auto flex flex-col items-center gap-4 text-center">
        <h1 className="flex w-full flex-col items-center">
          <span className="font-outfit text-[40px] font-black uppercase leading-[48px] text-promo-purple">
            {GAMES_HERO_CONSTANTS.TITLE_LINE_1}
          </span>
          <span className="font-outfit text-[40px] font-black uppercase leading-[48px] text-brand-text-white">
            {GAMES_HERO_CONSTANTS.TITLE_LINE_2}
          </span>
        </h1>
        <p className="font-outfit text-xl font-normal leading-[28px] text-brand-text-light max-w-[797px]">
          {GAMES_HERO_CONSTANTS.DESCRIPTION}
        </p>
      </div>
    </section>
  );
}
