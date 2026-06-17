'use client';
import { Maximize2, Settings } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { type Game } from '@/entities/game';
import { Button } from '@/shared/ui/button';
import { useGameSettings } from '../model/useGameSettings';
import { GAME_SETTINGS_LABELS } from '../model/constants';
import { SettingsPopover } from './SettingsPopover';
import { GameRulesModal } from './GameRulesModal';

interface Props {
  game: Game;
}

export function GameSettings({ game }: Props) {
  const {
    isFullscreen,
    toggleFullscreen,
    isMenuOpen,
    setIsMenuOpen,
    isRulesOpen,
    setIsRulesOpen,
    turboMode,
    setTurboMode,
    maxBet,
    setMaxBet,
    volume,
    setVolume,
  } = useGameSettings();

  return (
    <div className="flex flex-row items-center gap-1.5">
      <GameRulesModal isOpen={isRulesOpen} onOpenChange={setIsRulesOpen} game={game} />
      <Button
        variant="tab"
        size="none"
        onClick={toggleFullscreen}
        className="flex w-10 h-10 items-center justify-center rounded-lg border border-border-control bg-gradient-to-b from-auth-surface to-auth-surface-light hover:brightness-110 active:scale-95 transition-all cursor-pointer group"
        title={isFullscreen ? GAME_SETTINGS_LABELS.exitFullscreen : GAME_SETTINGS_LABELS.fullscreen}
        aria-label={GAME_SETTINGS_LABELS.toggleFullscreen}
      >
        <Maximize2 className="w-5 h-5 text-brand-text-light transition-transform duration-200 group-hover:scale-105" />
      </Button>
      <SettingsPopover
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        onOpenRules={() => setIsRulesOpen(true)}
        turboMode={turboMode}
        setTurboMode={setTurboMode}
        maxBet={maxBet}
        setMaxBet={setMaxBet}
        volume={volume}
        setVolume={setVolume}
        trigger={
          <Button
            variant="tab"
            size="none"
            className={cn(
              'flex w-10 h-10 items-center justify-center rounded-lg border border-border-control bg-gradient-to-b from-auth-surface to-auth-surface-light hover:brightness-110 active:scale-95 transition-all cursor-pointer group',
              isMenuOpen && 'brightness-125'
            )}
            title={GAME_SETTINGS_LABELS.settings}
            aria-label={GAME_SETTINGS_LABELS.gameSettings}
          >
            <Settings className="w-5 h-5 text-brand-text-light transition-transform duration-200 group-hover:scale-105" />
          </Button>
        }
      />
    </div>
  );
}
