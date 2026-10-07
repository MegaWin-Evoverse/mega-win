'use client';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { Button } from '@/shared/ui/button';
import { AmountInput } from '@/shared/ui/amount-input';
import { LabeledField } from '@/shared/ui/labeled-field';
import { GAME_PANEL_LABELS } from '@/shared/config';
import { useAutoBet } from '../model/useAutoBet';

interface Props {
  className?: string;
}

export function NumberOfBetsField({ className }: Props) {
  const { numberOfBets, onNumberOfBetsChange, onInfinityClick, isAutoMode } = useAutoBet();

  return (
    <CollapsibleSection isOpen={isAutoMode} className={className} openClassName="lg:mt-4">
      <LabeledField
        label={GAME_PANEL_LABELS.NUMBER_OF_BETS}
        labelClassName="text-sm font-medium text-brand-text-light/80"
      >
        <AmountInput
          value={numberOfBets}
          onValueChange={onNumberOfBetsChange}
          inputMode="numeric"
          trailing={
            <Button
              variant="ghost"
              size="none"
              onClick={onInfinityClick}
              className="flex h-7 items-center justify-center rounded-md border border-border-default bg-surface-inset px-2.5 font-outfit text-base text-brand-text-light hover:text-brand-text-white transition-colors duration-150"
              aria-label={GAME_PANEL_LABELS.INFINITY_ARIA_LABEL}
            >
              {GAME_PANEL_LABELS.INFINITY_SYMBOL}
            </Button>
          }
        />
      </LabeledField>
    </CollapsibleSection>
  );
}
