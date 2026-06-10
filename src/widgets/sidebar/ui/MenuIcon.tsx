import { type ComponentProps } from 'react';
import {
  ShoppingCart,
  Trophy,
  Gamepad2,
  Star,
  Gift,
  Crown,
  Dices,
  Disc,
  type LucideProps,
} from 'lucide-react';

import { type IconName } from '../model/menu';
import { PlinkoIcon } from './PlinkoIcon';
import { RouletteIcon } from './RouletteIcon';
import { KenoIcon } from './KenoIcon';

interface Props extends ComponentProps<'svg'> {
  name: IconName;
}

export function MenuIcon({ name, ...props }: Props) {
  const iconProps: LucideProps = {
    size: 20,
    className: props.className,
  };

  switch (name) {
    case 'pointshop':
      return <ShoppingCart {...iconProps} />;
    case 'leaderboard':
      return <Trophy {...iconProps} />;
    case 'games':
      return <Gamepad2 {...iconProps} />;
    case 'rewards':
      return <Star {...iconProps} />;
    case 'bonuses':
      return <Gift {...iconProps} />;
    case 'wheel':
      return <Disc {...iconProps} />;
    case 'winners':
      return <Crown {...iconProps} />;
    case 'roulette':
      return <RouletteIcon {...props} />;
    case 'keno':
      return <KenoIcon {...props} />;
    case 'plinko':
      return <PlinkoIcon {...props} />;
    case 'dice':
      return <Dices {...iconProps} />;
  }
}
