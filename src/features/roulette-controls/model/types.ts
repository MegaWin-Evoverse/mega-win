import type { BetType } from './constants';

export interface PlacedBet {
  type: BetType;
  key: string;
  amount: number;
  label: string;
}

export interface BetResponse {
  betId: string;
  createdAt: string;
  betSize: string;
  payout: string;
  randomPosition: number;
  multiplier: number;
}

export interface BetResult {
  multiplier: number;
  payout: string;
  position: number;
}

export interface HistoryEntry {
  id: number;
  position: number;
}

interface StraightValue {
  straightNumber: number;
  amount: string;
}

interface HalfValue {
  half: string;
  amount: string;
}

interface ParityValue {
  parity: string;
  amount: string;
}

interface ColorValue {
  color: string;
  amount: string;
}

interface ColumnValue {
  column: string;
  amount: string;
}

interface DozenValue {
  dozen: string;
  amount: string;
}

// Bet types the backend accepts but the table UI does not yet place — always sent empty.
interface UnsupportedBetValue {
  amount: string;
}

export interface BetParams {
  straightValues: StraightValue[];
  halfValues: HalfValue[];
  parityValues: ParityValue[];
  colorValues: ColorValue[];
  columnValues: ColumnValue[];
  dozenValues: DozenValue[];
  splitValues: UnsupportedBetValue[];
  cornerValues: UnsupportedBetValue[];
  streetValues: UnsupportedBetValue[];
  doubleStreetValues: UnsupportedBetValue[];
}
