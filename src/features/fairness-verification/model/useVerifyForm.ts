'use client';
import { useState } from 'react';
import type { Game, Risk } from '@/entities/game';
import { DEFAULT_VERIFY_NONCE, DEFAULT_VERIFY_ROWS, DEFAULT_VERIFY_RISK } from './constants';

export interface VerifyFormState {
  selectedVerifyGame: Game;
  onVerifyGameChange: (game: Game) => void;
  verifyClientSeed: string;
  onClientSeedChange: (value: string) => void;
  verifyServerSeed: string;
  onServerSeedChange: (value: string) => void;
  verifyNonce: string;
  onNonceChange: (value: string) => void;
  verifyRows: number;
  onRowsChange: (rows: number) => void;
  verifyRisk: Risk;
  onRiskChange: (risk: Risk) => void;
}

export function useVerifyForm(game: Game): VerifyFormState {
  const [selectedVerifyGame, setSelectedVerifyGame] = useState<Game>(game);
  const [verifyClientSeed, setVerifyClientSeed] = useState<string>('');
  const [verifyServerSeed, setVerifyServerSeed] = useState<string>('');
  const [verifyNonce, setVerifyNonce] = useState<string>(DEFAULT_VERIFY_NONCE);
  const [verifyRows, setVerifyRows] = useState<number>(DEFAULT_VERIFY_ROWS);
  const [verifyRisk, setVerifyRisk] = useState<Risk>(DEFAULT_VERIFY_RISK);

  return {
    selectedVerifyGame,
    onVerifyGameChange: setSelectedVerifyGame,
    verifyClientSeed,
    onClientSeedChange: setVerifyClientSeed,
    verifyServerSeed,
    onServerSeedChange: setVerifyServerSeed,
    verifyNonce,
    onNonceChange: setVerifyNonce,
    verifyRows,
    onRowsChange: setVerifyRows,
    verifyRisk,
    onRiskChange: setVerifyRisk,
  };
}
