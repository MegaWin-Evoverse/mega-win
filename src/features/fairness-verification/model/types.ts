import { type FAIRNESS_TAB } from './constants';

export interface FairnessData {
  clientSeed: string;
  hashedServerSeed: string;
  nextHashedServerSeed: string;
  nonce: number;
}

export type FairnessTab = (typeof FAIRNESS_TAB)[keyof typeof FAIRNESS_TAB];
