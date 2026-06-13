'use client';

import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

interface Props {
  className?: string;
}

export function SoundToggle({ className }: Props) {
  const [isMuted, setIsMuted] = useState(false);

  function handleMuteToggle() {
    setIsMuted((muted) => !muted);
  }

  return (
    <Button
      variant="ghost"
      size="none"
      onClick={handleMuteToggle}
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
