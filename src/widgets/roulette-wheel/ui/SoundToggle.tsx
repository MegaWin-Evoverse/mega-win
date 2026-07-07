'use client';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { useSoundStore } from '@/shared/lib/soundStore';

interface Props {
  className?: string;
}

export function SoundToggle({ className }: Props) {
  const isMuted = useSoundStore((state) => state.isMuted);
  const toggleMute = useSoundStore((state) => state.toggleMute);

  return (
    <Button
      variant="ghost"
      size="none"
      onClick={toggleMute}
      className={cn(
        'flex size-10 items-center justify-center rounded-[4px] border border-roulette-cell-border bg-border-default/80 text-brand-text-muted transition-colors hover:bg-brand-btn-gradient-to hover:text-brand-text-white',
        className
      )}
      aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
    </Button>
  );
}
