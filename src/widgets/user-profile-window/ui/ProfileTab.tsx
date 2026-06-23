'use client';

import {
  SECTION_LABELS,
  USERNAME_LABEL,
  USERNAME_HINT,
  STAT_LABELS,
  PRIVATE_MODE_LABEL,
  PRIVATE_MODE_DESC,
  CRYPTO_WALLETS,
  PRIVATE_MODE_SWITCH_ID,
} from '../model/constants';
import { Lock } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Switch } from '@/shared/ui/switch';
import { Label } from '@/shared/ui/label';
import { useProfileTab } from '../model/useProfileTab';
import { StatCard } from './StatCard';
import { CryptoWalletInput } from './CryptoWalletInput';
import type { User } from '@/entities/user';

interface Props {
  user: User;
}

export function ProfileTab({ user }: Props) {
  const {
    isPrivateModeEnabled,
    onPrivateModeToggle,
    editingWalletKey,
    walletDraftValues,
    onWalletEditStart,
    onWalletEditCancel,
    onWalletDraftChange,
    onWalletSave,
    gamePoints,
    watchPoints,
    cryptoAddresses,
  } = useProfileTab(user);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold">{SECTION_LABELS.PROFILE}</h3>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="username-input" className="text-sm text-muted-foreground">
            {USERNAME_LABEL}
          </Label>

          <div className="relative">
            <Input id="username-input" value={user.username} readOnly className="pr-9" />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          </div>

          <p className="text-xs text-muted-foreground">{USERNAME_HINT}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold">{SECTION_LABELS.STATISTICS}</h3>

        <div className="flex gap-3">
          <StatCard label={STAT_LABELS.TOTAL_WAGERED} value={gamePoints} />
          <StatCard label={STAT_LABELS.WAGER_POINTS_SPENT} value={watchPoints} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold">{SECTION_LABELS.PREFERENCES}</h3>

        <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-primary px-4 py-3">
          <Switch
            id={PRIVATE_MODE_SWITCH_ID}
            checked={isPrivateModeEnabled}
            onCheckedChange={onPrivateModeToggle}
          />

          <div className="flex flex-col gap-0.5">
            <Label htmlFor={PRIVATE_MODE_SWITCH_ID} className="text-sm font-medium cursor-pointer">
              {PRIVATE_MODE_LABEL}
            </Label>

            <p className="text-xs text-muted-foreground">{PRIVATE_MODE_DESC}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold">{SECTION_LABELS.CRYPTO_WALLETS}</h3>

        <div className="flex gap-2">
          {CRYPTO_WALLETS.map((wallet) => (
            <CryptoWalletInput
              key={wallet.key}
              walletKey={wallet.key}
              label={wallet.label}
              placeholder={wallet.placeholder}
              savedValue={cryptoAddresses[wallet.key]}
              isEditing={editingWalletKey === wallet.key}
              draftValue={walletDraftValues[wallet.key]}
              onEditStart={onWalletEditStart}
              onEditCancel={onWalletEditCancel}
              onDraftChange={onWalletDraftChange}
              onSave={onWalletSave}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
