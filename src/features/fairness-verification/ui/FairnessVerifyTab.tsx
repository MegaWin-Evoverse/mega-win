import type { ChangeEvent } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { GAME, type Game } from '@/entities/game';
import { VERIFY_GAMES, FAIRNESS_LABELS } from '../model/constants';
import { getGameIcon, getGameLabel } from '../model/helpers';
import { useVerifyOutcome } from '../model/useVerifyOutcome';
import type { VerifyFormState } from '../model/useVerifyForm';
import { FairnessRouletteBoard } from './FairnessRouletteBoard';
import { FairnessPlinkoPreview } from './FairnessPlinkoPreview';

type Props = VerifyFormState;

export function FairnessVerifyTab({
  selectedVerifyGame,
  onVerifyGameChange,
  verifyClientSeed,
  onClientSeedChange,
  verifyServerSeed,
  onServerSeedChange,
  verifyNonce,
  onNonceChange,
  verifyRows,
  onRowsChange,
  verifyRisk,
  onRiskChange,
}: Props) {
  const winningNumber = useVerifyOutcome(verifyClientSeed, verifyServerSeed, verifyNonce);

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      <div className="flex flex-col gap-3 w-full">
        {selectedVerifyGame === GAME.ROULETTE && (
          <FairnessRouletteBoard winningNumber={winningNumber} />
        )}
        {selectedVerifyGame === GAME.PLINKO && (
          <FairnessPlinkoPreview
            rows={verifyRows}
            onRowsChange={onRowsChange}
            risk={verifyRisk}
            onRiskChange={onRiskChange}
            clientSeed={verifyClientSeed}
            serverSeed={verifyServerSeed}
            nonce={verifyNonce}
          />
        )}
        <div className="flex flex-col gap-1 w-full">
          <span className="font-outfit font-light text-sm text-brand-text-light select-none">
            {FAIRNESS_LABELS.fieldGame}
          </span>
          <Select
            value={selectedVerifyGame}
            onValueChange={(val) => {
              if (val !== null) onVerifyGameChange(val as Game);
            }}
          >
            <SelectTrigger className="w-full data-[size=default]:h-11 bg-bg-primary border border-border-default text-sm font-normal font-outfit text-brand-text-light hover:text-brand-text-white text-left px-3 gap-2 rounded-lg [&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-2 [&_[data-slot=select-value]]:w-full cursor-pointer shadow-sm">
              <SelectValue>
                {getGameIcon(selectedVerifyGame)}
                <span>{getGameLabel(selectedVerifyGame)}</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {VERIFY_GAMES.map((verifyGame) => (
                <SelectItem key={verifyGame} value={verifyGame} className="h-11 font-outfit">
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => onClientSeedChange(e.target.value)}
            className="h-11 px-3 bg-bg-primary border-border-default rounded-lg font-outfit text-sm text-brand-text-light focus-visible:border-button-brand-bg-dark focus-visible:ring-0"
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => onServerSeedChange(e.target.value)}
            className="h-11 px-3 bg-bg-primary border-border-default rounded-lg font-outfit text-sm text-brand-text-light focus-visible:border-button-brand-bg-dark focus-visible:ring-0"
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => onNonceChange(e.target.value)}
            className="h-11 px-3 bg-bg-primary border-border-default rounded-lg font-outfit text-sm text-brand-text-light focus-visible:border-button-brand-bg-dark focus-visible:ring-0 [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder={FAIRNESS_LABELS.placeholderNonce}
          />
        </div>
      </div>
    </div>
  );
}
