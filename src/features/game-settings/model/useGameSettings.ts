'use client';
import { useState, useEffect } from 'react';
import { DEFAULT_VOLUME } from './constants';

export function useGameSettings() {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [turboMode, setTurboMode] = useState<boolean>(true);
  const [maxBet, setMaxBet] = useState<boolean>(false);
  const [volume, setVolume] = useState<number[]>([DEFAULT_VOLUME]);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error('Error attempting to enable fullscreen:', err);
        });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  }

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return {
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
  };
}
