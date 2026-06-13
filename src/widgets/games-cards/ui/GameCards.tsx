import { SectionHeader } from '@/shared/ui/section-header';
import { GAME_CARDS, GAME_CARDS_CONSTANTS } from '../model/constants';
import { GameCard } from './GameCard';

export function GameCards() {
  return (
    <section
      aria-label={GAME_CARDS_CONSTANTS.SECTION_ARIA_LABEL}
      className="flex w-full flex-col gap-4"
    >
      <SectionHeader
        title={GAME_CARDS_CONSTANTS.SECTION_TITLE}
        iconSrc={GAME_CARDS_CONSTANTS.ICON_SRC}
        iconWidth={GAME_CARDS_CONSTANTS.ICON_WIDTH}
        iconHeight={GAME_CARDS_CONSTANTS.ICON_HEIGHT}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {GAME_CARDS.map((card) => (
          <GameCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
