'use client';
import { Pencil } from 'lucide-react';
import {
  SECTION_LABELS,
  USERNAME_LABEL,
  USERNAME_HINT,
  USERNAME_EDIT_ARIA,
  STAT_LABELS,
  STAT_CARD_BACKGROUND,
  PRIVATE_MODE_LABEL,
  PRIVATE_MODE_DESC,
  CRYPTO_WALLETS,
  PRIVATE_MODE_SWITCH_ID,
} from '../model/constants';
import { COIN_ICON, GAME_POINT_ICON } from '@/shared/config';
import { Input } from '@/shared/ui/input';
import { Switch } from '@/shared/ui/switch';
import { Label } from '@/shared/ui/label';
import { Button } from '@/shared/ui/button';
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
    isEditingUsername,
    isSavingUsername,
    usernameInput,
    usernameInputRef,
    onUsernameEditStart,
    onUsernameChange,
    onUsernameBlur,
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
            <Input
              ref={usernameInputRef}
              id="username-input"
              value={isEditingUsername ? usernameInput : user.username}
              readOnly={!isEditingUsername}
              disabled={isSavingUsername}
              onChange={(e) => onUsernameChange(e.target.value)}
              onBlur={onUsernameBlur}
              onKeyDown={(e) => e.key === 'Enter' && onUsernameBlur()}
              className="h-[42px] rounded-[8px] border-auth-surface bg-auth-bg pr-9 transition-colors duration-200 focus-visible:border-button-brand-bg-dark focus-visible:ring-0 read-only:cursor-default read-only:focus-visible:border-auth-surface"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={USERNAME_EDIT_ARIA}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              disabled={isEditingUsername || isSavingUsername}
              onClick={onUsernameEditStart}
            >
              <Pencil className="size-3.5 text-muted-foreground" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">{USERNAME_HINT}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold">{SECTION_LABELS.STATISTICS}</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <StatCard
            label={STAT_LABELS.TOTAL_WAGERED}
            value={gamePoints}
            backgroundSrc={STAT_CARD_BACKGROUND.WAGERED}
            pointIcon={GAME_POINT_ICON}
          />
          <StatCard
            label={STAT_LABELS.WAGER_POINTS_SPENT}
            value={watchPoints}
            backgroundSrc={STAT_CARD_BACKGROUND.POINTS_SPENT}
            pointIcon={COIN_ICON}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold">{SECTION_LABELS.PREFERENCES}</h3>
        <div className="flex flex-row items-center gap-3 rounded-xl bg-bg-primary px-4 py-3">
          <Switch
            id={PRIVATE_MODE_SWITCH_ID}
            checked={isPrivateModeEnabled}
            onCheckedChange={onPrivateModeToggle}
          />
          <div className="flex flex-col items-start gap-1">
            <Label
              htmlFor={PRIVATE_MODE_SWITCH_ID}
              className="font-outfit font-medium text-base leading-5 text-foreground cursor-pointer"
            >
              {PRIVATE_MODE_LABEL}
            </Label>
            <p className="font-outfit font-normal text-sm leading-[18px] text-text-secondary">
              {PRIVATE_MODE_DESC}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold">{SECTION_LABELS.CRYPTO_WALLETS}</h3>
        <div className="flex flex-col lg:flex-row gap-2">
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
