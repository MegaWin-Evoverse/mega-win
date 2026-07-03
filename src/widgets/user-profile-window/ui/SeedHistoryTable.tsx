'use client';
import { useState } from 'react';
import { DataTable, DATA_TABLE_ROW_CLASS } from '@/shared/ui/data-table';
import { TableCell, TableRow } from '@/shared/ui/table';
import {
  CELL_CLASS,
  HEAD_CLASS,
  SEED_COPY_RESET_MS,
  SEED_DATE_FORMAT,
  SEED_TABLE_COLUMNS,
} from '../model/constants';
import { SeedHistoryCell } from './SeedHistoryCell';
import type { SeedHistoryItem } from '../model/types';

interface Props {
  seeds: SeedHistoryItem[];
}

export function SeedHistoryTable({ seeds }: Props) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function handleCopy(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), SEED_COPY_RESET_MS);
    } catch (error) {
      console.error('Failed to copy seed to clipboard:', error);
    }
  }

  return (
    <DataTable
      columns={[
        SEED_TABLE_COLUMNS.CLIENT_SEED,
        SEED_TABLE_COLUMNS.SERVER_SEED,
        SEED_TABLE_COLUMNS.NONCE,
        SEED_TABLE_COLUMNS.DATE,
      ]}
      headClassName={HEAD_CLASS}
    >
      {seeds.map((seed) => (
        <TableRow key={seed.id} className={DATA_TABLE_ROW_CLASS}>
          <SeedHistoryCell
            seed={seed.clientSeed}
            copyKey={`${seed.id}-client`}
            copiedKey={copiedKey}
            ariaLabel="Copy client seed"
            onCopy={handleCopy}
          />
          <SeedHistoryCell
            seed={seed.serverSeed}
            copyKey={`${seed.id}-server`}
            copiedKey={copiedKey}
            ariaLabel="Copy server seed"
            onCopy={handleCopy}
          />
          <TableCell className={CELL_CLASS}>{seed.nonce}</TableCell>
          <TableCell className={CELL_CLASS}>
            {SEED_DATE_FORMAT.format(new Date(seed.createdAt))}
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  );
}
