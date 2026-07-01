import { Crown, Dices, Layers, Triangle, Compass } from 'lucide-react';
import type { GameIconName } from '../model/types';

const ICON_SIZE = 16;

interface Props {
  name: GameIconName;
  className?: string;
}

export function GameIcon({ name, className }: Props) {
  if (name === 'winners') return <Crown className={className} size={ICON_SIZE} />;
  if (name === 'dice') return <Dices className={className} size={ICON_SIZE} />;
  if (name === 'keno') return <Layers className={className} size={ICON_SIZE} />;
  if (name === 'plinko') return <Triangle className={className} size={ICON_SIZE} />;
  if (name === 'roulette') return <Compass className={className} size={ICON_SIZE} />;
  return null;
}
