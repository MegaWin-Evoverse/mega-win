import { useGameControlsStore } from '@/entities/game';
import {
  useRouletteStore,
  BET_TYPE,
  betZoneKey,
  type ColumnKey,
  type DozenKey,
  type HalfKey,
  type ParityKey,
  type ColorKey,
} from '@/features/roulette-controls';
import type { PlacedBet } from '@/features/roulette-controls';

export function useBettingTable() {
  const selectedChip = useGameControlsStore((state) => state.selectedChip);
  const placedBets = useRouletteStore((state) => state.placedBets);
  const placeBetOnZone = useRouletteStore((state) => state.placeBetOnZone);
  const clearTable = useRouletteStore((state) => state.clearTable);
  const undo = useRouletteStore((state) => state.undo);

  const chip = selectedChip ?? undefined;

  function getZoneBet(key: string): PlacedBet | undefined {
    return placedBets.find((b) => b.key === key);
  }

  function handleStraightBet(n: number) {
    if (!chip) return;
    placeBetOnZone(BET_TYPE.STRAIGHT, betZoneKey(BET_TYPE.STRAIGHT, n), String(n), chip);
  }

  function handleColumnBet(col: ColumnKey) {
    if (!chip) return;
    placeBetOnZone(BET_TYPE.COLUMN, betZoneKey(BET_TYPE.COLUMN, col), '2:1', chip);
  }

  function handleDozenBet(dozen: DozenKey, label: string) {
    if (!chip) return;
    placeBetOnZone(BET_TYPE.DOZEN, betZoneKey(BET_TYPE.DOZEN, dozen), label, chip);
  }

  function handleHalfBet(half: HalfKey, label: string) {
    if (!chip) return;
    placeBetOnZone(BET_TYPE.HALF, betZoneKey(BET_TYPE.HALF, half), label, chip);
  }

  function handleParityBet(parity: ParityKey, label: string) {
    if (!chip) return;
    placeBetOnZone(BET_TYPE.PARITY, betZoneKey(BET_TYPE.PARITY, parity), label, chip);
  }

  function handleColorBet(color: ColorKey) {
    if (!chip) return;
    placeBetOnZone(BET_TYPE.COLOR, betZoneKey(BET_TYPE.COLOR, color), color, chip);
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
