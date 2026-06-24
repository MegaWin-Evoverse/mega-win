import { ROUTES } from '@/shared/config';
import { SectionTitle } from '@/shared/ui/section-title';
import { GAME_CARDS_CONSTANTS } from '../model/constants';
import { GameCardsGrid } from './GameCardsGrid';

export function GameCards() {
  return (
    <section
      aria-label={GAME_CARDS_CONSTANTS.SECTION_ARIA_LABEL}
      className="flex w-full flex-col gap-4"
    >
      <SectionTitle
        title={GAME_CARDS_CONSTANTS.SECTION_TITLE}
        href={ROUTES.GAMES}
        iconSrc={GAME_CARDS_CONSTANTS.ICON_SRC}
        iconWidth={GAME_CARDS_CONSTANTS.ICON_WIDTH}
        iconHeight={GAME_CARDS_CONSTANTS.ICON_HEIGHT}
      />
      <GameCardsGrid />
    </section>
  );
}
