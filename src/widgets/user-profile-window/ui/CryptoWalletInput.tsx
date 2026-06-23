'use client';
import { Pencil, Check, X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import {
  WALLET_EDIT_ARIA,
  WALLET_SAVE_ARIA,
  WALLET_CANCEL_ARIA,
  LABEL_COLOR,
} from '../model/constants';
import type { CryptoWalletKey } from '../model/types';

interface Props {
  walletKey: CryptoWalletKey;
  label: string;
  placeholder: string;
  savedValue: string | null;
  isEditing: boolean;
  draftValue: string;
  onEditStart: (key: CryptoWalletKey) => void;
  onEditCancel: () => void;
  onDraftChange: (key: CryptoWalletKey, value: string) => void;
  onSave: () => void;
}

export function CryptoWalletInput({
  walletKey,
  label,
  placeholder,
  savedValue,
  isEditing,
  draftValue,
  onEditStart,
  onEditCancel,
  onDraftChange,
  onSave,
}: Props) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-primary px-3 py-2 flex-1 min-w-0">
      <span className={cn('text-xs font-bold shrink-0', LABEL_COLOR[walletKey])}>{label}</span>
      <Input
        className="h-7 border-0 bg-transparent px-0 text-xs focus-visible:ring-0 min-w-0"
        placeholder={placeholder}
        value={isEditing ? draftValue : (savedValue ?? '')}
        readOnly={!isEditing}
        onChange={(e) => onDraftChange(walletKey, e.target.value)}
      />
      {isEditing ? (
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon-sm" aria-label={WALLET_SAVE_ARIA} onClick={onSave}>
            <Check className="size-3.5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={WALLET_CANCEL_ARIA}
            onClick={onEditCancel}
          >
            <X className="size-3.5" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={WALLET_EDIT_ARIA}
          className="shrink-0"
          onClick={() => onEditStart(walletKey)}
        >
          <Pencil className="size-3.5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
