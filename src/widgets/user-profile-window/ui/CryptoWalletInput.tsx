'use client';
import Image from 'next/image';
import { Pencil, Check, X } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import {
  WALLET_EDIT_ARIA,
  WALLET_SAVE_ARIA,
  WALLET_CANCEL_ARIA,
  CRYPTO_ICONS,
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
    <div className="flex flex-1">
      <div className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-l-lg border border-r-0 border-auth-surface bg-auth-bg px-3">
        <Image src={CRYPTO_ICONS[walletKey]} alt={label} width={16} height={16} />
        <span className="font-outfit text-sm text-text-secondary">{label}</span>
      </div>
      <div className="relative flex-1">
        <Input
          variant="brand"
          className="h-11 rounded-l-none rounded-r-lg border-auth-surface bg-auth-bg px-3 pr-9 font-outfit text-sm read-only:cursor-default read-only:focus-visible:border-auth-surface"
          placeholder={placeholder}
          value={isEditing ? draftValue : (savedValue ?? '')}
          readOnly={!isEditing}
          onChange={(e) => onDraftChange(walletKey, e.target.value)}
        />
        {isEditing ? (
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
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
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => onEditStart(walletKey)}
          >
            <Pencil className="size-3.5 text-text-secondary" />
          </Button>
        )}
      </div>
    </div>
  );
}
