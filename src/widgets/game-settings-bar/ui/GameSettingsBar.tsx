import { cn } from '@/shared/lib/cn';
import { type Game } from '@/entities/game';
import { GameSettings } from '@/features/game-settings';
import { ProvablyFair } from '@/features/fairness-verification';

interface Props {
  game: Game;
  className?: string;
}

export function GameSettingsBar({ game, className }: Props) {
  return (
    <div
      className={cn(
        'flex w-full max-w-[1017px] h-16 flex-col justify-center items-center p-3 bg-bg-primary rounded-xl select-none border border-border/10 shadow-lg shrink-0 relative',
        className
      )}
    >
      <div className="flex w-full h-10 flex-row justify-between items-center px-0">
        <GameSettings game={game} />
        <ProvablyFair game={game} />
      </div>
    </div>
  );
}
