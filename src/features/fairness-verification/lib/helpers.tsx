import { Dices, Layers, Triangle, Compass } from 'lucide-react';
import { GAME, type Game } from '@/entities/game';
import { GAME_LABELS } from '../model/constants';

export function getGameIcon(g: Game) {
  switch (g) {
    case GAME.DICE:
      return <Dices className="w-5 h-5 text-current shrink-0" />;
    case GAME.KENO:
      return <Layers className="w-5 h-5 text-current shrink-0" />;
    case GAME.PLINKO:
      return <Triangle className="w-5 h-5 text-current shrink-0" />;
    case GAME.ROULETTE:
      return <Compass className="w-5 h-5 text-current shrink-0" />;
    default:
      return null;
  }
}

export function getGameLabel(g: Game) {
  return GAME_LABELS[g];
}
