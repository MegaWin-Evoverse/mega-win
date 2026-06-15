import { KENO_NUMBERS } from '../model/constants';
import type { CellState } from '../model/types';
import { Cell } from './Cell';

interface Props {
  getCellState: (n: number) => CellState;
  onNumberToggle: (n: number) => void;
}

export function Board({ getCellState, onNumberToggle }: Props) {
  return (
    <div className="grid w-full grid-cols-8 gap-[4.75px]">
      {KENO_NUMBERS.map((number) => {
        const state = getCellState(number);

        return (
          <Cell
            key={state === 'drawn' ? `${number}-drawn` : number}
            number={number}
            state={state}
            onSelect={onNumberToggle}
          />
        );
      })}
    </div>
  );
}
