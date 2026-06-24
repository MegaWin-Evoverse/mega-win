import Image from 'next/image';
import { Crown, Dices } from 'lucide-react';
import { GAME_ICON_SRC } from '../model/constants';
import type { GameIconName } from '../model/types';

const ICON_SIZE = 16;

interface Props {
  name: GameIconName;
  className?: string;
}

export function GameIcon({ name, className }: Props) {
  if (name === 'winners') return <Crown className={className} size={ICON_SIZE} />;
  if (name === 'dice') return <Dices className={className} size={ICON_SIZE} />;

  const src = GAME_ICON_SRC[name as keyof typeof GAME_ICON_SRC];
  if (!src) return null;

  return <Image src={src} alt={name} width={ICON_SIZE} height={ICON_SIZE} className={className} />;
}
