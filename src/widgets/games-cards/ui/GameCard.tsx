import Link from 'next/link';
import Image from 'next/image';
import { type GameCardData, GAME_CARDS_CONSTANTS } from '../config/constants';

interface Props {
  card: GameCardData;
}

export function GameCard({ card }: Props) {
  const { title, imageSrc, href } = card;

  return (
    <Link
      href={href}
      className="relative block w-full overflow-hidden rounded-xl bg-brand-border/30 border border-brand-border/20 transition-all duration-300 ease-out hover:border-brand-border hover:shadow-lg hover:shadow-black/20 hover:scale-[1.04] group cursor-pointer"
    >
      <Image
        src={imageSrc}
        alt={title}
        width={GAME_CARDS_CONSTANTS.CARD_WIDTH}
        height={GAME_CARDS_CONSTANTS.CARD_HEIGHT}
        className="w-full h-auto block"
        priority
      />
    </Link>
  );
}
