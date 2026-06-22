'use client';
import { useState } from 'react';
import type { Game } from '@/entities/game';
import { DEFAULT_VERIFY_NONCE } from './constants';

export interface VerifyFormState {
  selectedVerifyGame: Game;
  onVerifyGameChange: (game: Game) => void;
  verifyClientSeed: string;
  onClientSeedChange: (value: string) => void;
  verifyServerSeed: string;
  onServerSeedChange: (value: string) => void;
  verifyNonce: string;
  onNonceChange: (value: string) => void;
}

export function useVerifyForm(game: Game): VerifyFormState {
  const [selectedVerifyGame, setSelectedVerifyGame] = useState<Game>(game);
  const [verifyClientSeed, setVerifyClientSeed] = useState<string>('');
  const [verifyServerSeed, setVerifyServerSeed] = useState<string>('');
  const [verifyNonce, setVerifyNonce] = useState<string>(DEFAULT_VERIFY_NONCE);

  return {
    selectedVerifyGame,
    onVerifyGameChange: setSelectedVerifyGame,
    verifyClientSeed,
    onClientSeedChange: setVerifyClientSeed,
    verifyServerSeed,
    onServerSeedChange: setVerifyServerSeed,
    verifyNonce,
    onNonceChange: setVerifyNonce,
  };
}
