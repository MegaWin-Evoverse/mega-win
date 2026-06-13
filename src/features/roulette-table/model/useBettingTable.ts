import { useRouletteStore } from '@/features/roulette-controls';
import type { PlacedBet } from '@/features/roulette-controls';
import { BET_TYPE } from '@/features/roulette-controls';

export function useBettingTable() {
  const placedBets = useRouletteStore((state) => state.placedBets);
  const placeBetOnZone = useRouletteStore((state) => state.placeBetOnZone);
  const clearTable = useRouletteStore((state) => state.clearTable);
  const undo = useRouletteStore((state) => state.undo);

  function getZoneBet(key: string): PlacedBet | undefined {
    return placedBets.find((b) => b.key === key);
  }

  function handleStraightBet(n: number) {
    placeBetOnZone(BET_TYPE.STRAIGHT, `straight-${n}`, String(n));
  }

  function handleColumnBet(col: 'TOP' | 'MIDDLE' | 'BOTTOM') {
    placeBetOnZone(BET_TYPE.COLUMN, `column-${col}`, '2:1');
  }

  function handleDozenBet(dozen: 'FIRST' | 'SECOND' | 'THIRD', label: string) {
    placeBetOnZone(BET_TYPE.DOZEN, `dozen-${dozen}`, label);
  }

  function handleHalfBet(half: 'LOW' | 'HIGH', label: string) {
    placeBetOnZone(BET_TYPE.HALF, `half-${half}`, label);
  }

  function handleParityBet(parity: 'ODD' | 'EVEN', label: string) {
    placeBetOnZone(BET_TYPE.PARITY, `parity-${parity}`, label);
  }

  function handleColorBet(color: 'RED' | 'BLACK') {
    placeBetOnZone(BET_TYPE.COLOR, `color-${color}`, color);
  }

  return {
    getZoneBet,
    handleStraightBet,
    handleColumnBet,
    handleDozenBet,
    handleHalfBet,
    handleParityBet,
    handleColorBet,
    clearTable,
    undo,
  };
}

export type BettingTableHandlers = ReturnType<typeof useBettingTable>;
