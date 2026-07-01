'use client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
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
    <Table>
      <TableHeader className="[&_tr]:border-0">
        <TableRow className="border-0 hover:bg-transparent">
          <TableHead className={HEAD_CLASS}>{SEED_TABLE_COLUMNS.CLIENT_SEED}</TableHead>
          <TableHead className={HEAD_CLASS}>{SEED_TABLE_COLUMNS.SERVER_SEED}</TableHead>
          <TableHead className={HEAD_CLASS}>{SEED_TABLE_COLUMNS.NONCE}</TableHead>
          <TableHead className={HEAD_CLASS}>{SEED_TABLE_COLUMNS.DATE}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-0">
        {seeds.map((seed) => (
          <TableRow key={seed.id} className="border-0 odd:bg-bg-primary">
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
      </TableBody>
    </Table>
  );
}
