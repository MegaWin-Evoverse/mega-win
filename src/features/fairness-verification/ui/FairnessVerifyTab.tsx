'use client';
import { useState, type ChangeEvent } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import type { Game } from '@/entities/game';
import { VERIFY_GAMES, DEFAULT_VERIFY_NONCE, FAIRNESS_LABELS } from '../model/constants';
import { getGameIcon, getGameLabel } from '../model/helpers';

interface Props {
  game: Game;
}

export function FairnessVerifyTab({ game }: Props) {
  const [selectedVerifyGame, setSelectedVerifyGame] = useState<Game>(game);
  const [verifyClientSeed, setVerifyClientSeed] = useState<string>('');
  const [verifyServerSeed, setVerifyServerSeed] = useState<string>('');
  const [verifyNonce, setVerifyNonce] = useState<string>(DEFAULT_VERIFY_NONCE);

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-1 w-full">
          <span className="font-outfit font-light text-sm text-brand-text-light select-none">
            {FAIRNESS_LABELS.fieldGame}
          </span>
          <Select
            value={selectedVerifyGame}
            onValueChange={(val) => {
              if (val !== null) setSelectedVerifyGame(val as Game);
            }}
          >
            <SelectTrigger className="w-full data-[size=default]:h-11 bg-bg-primary border border-border-default text-sm font-normal font-outfit text-brand-text-light hover:text-brand-text-white text-left px-3 gap-2 rounded-lg [&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-2 [&_[data-slot=select-value]]:w-full cursor-pointer shadow-sm">
              <SelectValue>
                {getGameIcon(selectedVerifyGame)}
                <span>{getGameLabel(selectedVerifyGame)}</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-bg-primary border border-border-default p-1.5 rounded-lg w-[var(--anchor-width)] shadow-2xl">
              {VERIFY_GAMES.map((verifyGame) => (
                <SelectItem
                  key={verifyGame}
                  value={verifyGame}
                  className="h-11 pl-3 pr-8 bg-bg-primary text-brand-text-light hover:bg-auth-surface hover:text-brand-text-white focus:bg-auth-surface focus:text-brand-text-white font-outfit text-sm font-normal leading-[18px] rounded-lg cursor-pointer transition-colors flex items-center gap-2 w-full"
                >
                  {getGameIcon(verifyGame)}
                  <span>{getGameLabel(verifyGame)}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <span className="font-outfit font-light text-sm text-brand-text-light select-none">
            {FAIRNESS_LABELS.fieldClientSeed}
          </span>
          <Input
            type="text"
            value={verifyClientSeed}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setVerifyClientSeed(e.target.value)}
            className="h-11 px-3 bg-bg-primary border-border-default rounded-lg font-outfit text-sm text-brand-text-light focus-within:border-button-brand-bg-dark"
            placeholder={FAIRNESS_LABELS.placeholderClientSeed}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <span className="font-outfit font-light text-sm text-brand-text-light select-none">
            {FAIRNESS_LABELS.fieldServerSeed}
          </span>
          <Input
            type="text"
            value={verifyServerSeed}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setVerifyServerSeed(e.target.value)}
            className="h-11 px-3 bg-bg-primary border-border-default rounded-lg font-outfit text-sm text-brand-text-light focus-within:border-button-brand-bg-dark"
            placeholder={FAIRNESS_LABELS.placeholderServerSeed}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <span className="font-outfit font-light text-sm text-brand-text-light select-none">
            {FAIRNESS_LABELS.fieldNonce}
          </span>
          <Input
            type="number"
            value={verifyNonce}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setVerifyNonce(e.target.value)}
            className="h-11 px-3 bg-bg-primary border-border-default rounded-lg font-outfit text-sm text-brand-text-light focus-within:border-button-brand-bg-dark"
            placeholder={FAIRNESS_LABELS.placeholderNonce}
          />
        </div>
        <Button
          variant="tab"
          size="none"
          className="flex h-11 w-full items-center justify-center rounded-lg bg-brand-green-to hover:bg-brand-green-to/90 text-bg-primary font-outfit font-semibold text-sm transition-colors cursor-pointer mt-2"
        >
          {FAIRNESS_LABELS.verifyButton}
        </Button>
      </div>
    </div>
  );
}
