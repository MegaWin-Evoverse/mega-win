import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { GAME_FILTERS } from '../model/constants';
import { GameIcon } from './GameIcon';

interface Props {
  activeGame: string;
  onGameChange: (game: string) => void;
}

export function HistoryFilter({ activeGame, onGameChange }: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {GAME_FILTERS.map((filter) => {
        const isActive = activeGame === filter.value;
        return (
          <Button
            key={filter.value}
            variant="ghost"
            size="none"
            onClick={() => onGameChange(filter.value)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-bg-primary text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <GameIcon
              name={filter.iconName}
              className={cn(isActive && filter.value === 'all' && 'text-filter-icon-all')}
            />
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}
