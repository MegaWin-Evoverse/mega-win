import { cn } from '@/shared/lib/cn';
import { GAME_CARDS, GAME_CARDS_WIDE } from '../model/constants';
import { GameCard } from './GameCard';

interface Props {
  columns?: 2 | 4;
  variant?: 'square' | 'wide';
}

export function GameCardsGrid({ columns = 4, variant = 'square' }: Props) {
  const cards = variant === 'wide' ? GAME_CARDS_WIDE : GAME_CARDS;

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 gap-4 w-full',
        columns === 4 && 'lg:grid-cols-4'
      )}
    >
      {cards.map((card, index) => (
        <GameCard key={card.id} card={card} isPriority={index === 0} />
      ))}
    </div>
  );
}
