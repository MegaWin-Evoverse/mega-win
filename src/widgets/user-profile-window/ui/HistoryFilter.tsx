import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select';
import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { GAME_FILTERS } from '../model/constants';
import { GameIcon } from './GameIcon';

interface Props {
  activeGame: string;
  onGameChange: (game: string) => void;
}

export function HistoryFilter({ activeGame, onGameChange }: Props) {
  const activeFilter = GAME_FILTERS.find((filter) => filter.value === activeGame);

  const items = GAME_FILTERS.map((filter) => {
    const isActive = activeGame === filter.value;
    return {
      value: filter.value,
      className: 'h-8 px-2 py-1 text-sm',
      label: (
        <span className="flex items-center justify-center gap-1.5">
          <GameIcon
            name={filter.iconName}
            className={isActive ? 'text-brand-green-to' : undefined}
          />
          {filter.label}
        </span>
      ),
    };
  });

  return (
    <>
      <div className="sm:hidden">
        <Select
          value={activeGame}
          onValueChange={(value) => {
            if (value) onGameChange(value);
          }}
        >
          <SelectTrigger className="data-[size=default]:h-[42px] w-full rounded-[8px] border-auth-surface bg-auth-bg px-3 text-sm text-foreground focus-visible:border-button-brand-bg-dark focus-visible:ring-0 [&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-2">
            <SelectValue>
              {activeFilter && (
                <>
                  <GameIcon name={activeFilter.iconName} className="text-brand-green-to" />
                  <span>{activeFilter.label}</span>
                </>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {GAME_FILTERS.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                <GameIcon name={filter.iconName} />
                <span>{filter.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden sm:block w-1/3 min-w-fit">
        <SegmentedTabs
          items={items}
          value={activeGame}
          onValueChange={onGameChange}
          className="bg-transparent"
        />
      </div>
    </>
  );
}
