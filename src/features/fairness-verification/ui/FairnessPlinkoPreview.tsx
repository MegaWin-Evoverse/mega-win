'use client';
import { MultiplierRow, PLINKO_MULTIPLIERS, type LandedBucket, type Risk } from '@/entities/game';
import { usePlinkoVerifyOutcome } from '../model/usePlinkoVerifyOutcome';
import { VerifyRowsSlider } from './VerifyRowsSlider';
import { VerifyRiskSelector } from './VerifyRiskSelector';

interface Props {
  rows: number;
  onRowsChange: (rows: number) => void;
  risk: Risk;
  onRiskChange: (risk: Risk) => void;
  clientSeed: string;
  serverSeed: string;
  nonce: string;
}

export function FairnessPlinkoPreview({
  rows,
  onRowsChange,
  risk,
  onRiskChange,
  clientSeed,
  serverSeed,
  nonce,
}: Props) {
  const outcome = usePlinkoVerifyOutcome(clientSeed, serverSeed, nonce, rows, risk);
  const multipliers = PLINKO_MULTIPLIERS[risk]?.[rows] ?? [];
  const landedBucket: LandedBucket | null = outcome
    ? { bucket: outcome.bucket, hitAt: outcome.bucket }
    : null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <MultiplierRow multipliers={multipliers} landedBucket={landedBucket} />
      <VerifyRowsSlider rows={rows} onRowsChange={onRowsChange} />
      <VerifyRiskSelector risk={risk} onRiskChange={onRiskChange} />
    </div>
  );
}
