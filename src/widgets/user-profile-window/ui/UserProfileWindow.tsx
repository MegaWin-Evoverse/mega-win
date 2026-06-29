'use client';
import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { Tabs, TabsContent } from '@/shared/ui/tabs';
import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select';
import { GAME_POINT_ICON } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import { ResetPasswordModal } from '@/features/reset-password';
import { useUserProfileWindow } from '../model/useUserProfileWindow';
import { TAB_LABELS, TAB_LIST, PROFILE_WINDOW_TABS, TAB_ICONS } from '../model/constants';
import { ProfileTab } from './ProfileTab';
import { HistoryTab } from './HistoryTab';
import { SeedHistoryTab } from './SeedHistoryTab';
import { ConnectionsTab } from './ConnectionsTab';
import { formatUsername } from '../model/formatUsername';

export function UserProfileWindow() {
  const {
    user,
    gamePointsBalance,
    activeTab,
    onTabChange,
    isResetPasswordOpen,
    onOpenResetPassword,
    onCloseResetPassword,
  } = useUserProfileWindow();

  if (!user) return null;

  return (
    <div className="mx-auto flex w-full max-w-[1017px] flex-col mb-20 max-md:mb-8">
      <div className="mt-4 md:mt-8 flex items-center justify-between gap-3 rounded-xl bg-bg-primary p-4 md:p-8">
        <div className="flex items-center gap-4">
          <Avatar className="size-[60px] md:size-[90px]">
            <AvatarImage src={user.profileImgUrl} alt={user.username} />
            <AvatarFallback className="text-2xl">{formatUsername(user.username)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 items-start">
            <span className="text-xl md:text-2xl font-bold text-foreground">{user.username}</span>
            <span className="text-sm md:text-base text-text-secondary">{user.email}</span>
            <div className="flex sm:hidden items-center gap-1.5">
              <Image
                src={GAME_POINT_ICON.SRC}
                alt={GAME_POINT_ICON.ALT}
                width={GAME_POINT_ICON.SIZE_SUMMARY}
                height={GAME_POINT_ICON.SIZE_SUMMARY}
              />
              <span className="text-sm font-medium text-foreground">{gamePointsBalance}</span>
            </div>
            <Button
              variant="ghost"
              size="none"
              onClick={onOpenResetPassword}
              className="sm:hidden text-sm font-medium text-brand-green-to hover:bg-transparent hover:scale-105 transition-transform duration-300 ease-out px-0"
            >
              Reset Password
            </Button>
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-6">
          <div className="flex items-center gap-2 rounded-xl border border-border-default bg-page-bg px-6 py-3">
            <Image
              src={GAME_POINT_ICON.SRC}
              alt={GAME_POINT_ICON.ALT}
              width={GAME_POINT_ICON.SIZE_BALANCE}
              height={GAME_POINT_ICON.SIZE_BALANCE}
            />
            <span className="text-lg font-medium text-foreground">{gamePointsBalance}</span>
          </div>
          <Button
            variant="ghost"
            size="none"
            onClick={onOpenResetPassword}
            className="text-sm font-medium text-brand-green-to hover:bg-transparent hover:scale-105 transition-transform duration-300 ease-out px-1"
          >
            Reset Password
          </Button>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={onTabChange} className="mt-5">
        <div className="sm:hidden px-4">
          <Select value={activeTab} onValueChange={onTabChange}>
            <SelectTrigger className="data-[size=default]:h-[42px] w-full rounded-xl border-auth-surface bg-bg-primary px-4 font-outfit text-sm text-foreground focus-visible:border-button-brand-bg-dark focus-visible:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TAB_LIST.map((tab) => (
                <SelectItem key={tab} value={tab}>
                  {TAB_LABELS[tab]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden sm:block">
          <SegmentedTabs
            value={activeTab}
            onValueChange={onTabChange}
            items={TAB_LIST.map((tab) => {
              const Icon = TAB_ICONS[tab];
              return {
                value: tab,
                label: (
                  <span className="flex items-center justify-center gap-2">
                    <Icon className="size-4" />
                    {TAB_LABELS[tab]}
                  </span>
                ),
              };
            })}
          />
        </div>
        <TabsContent value={PROFILE_WINDOW_TABS.PROFILE} className="px-4 py-4 sm:px-8 sm:py-6 m-0">
          <ProfileTab user={user} />
        </TabsContent>
        <TabsContent
          value={PROFILE_WINDOW_TABS.BETS_HISTORY}
          className="px-4 py-4 sm:px-8 sm:py-6 m-0"
        >
          <HistoryTab user={user} />
        </TabsContent>
        <TabsContent
          value={PROFILE_WINDOW_TABS.SEED_HISTORY}
          className="px-4 py-4 sm:px-8 sm:py-6 m-0"
        >
          <SeedHistoryTab />
        </TabsContent>
        <TabsContent
          value={PROFILE_WINDOW_TABS.CONNECTIONS}
          className="px-4 py-4 sm:px-8 sm:py-6 m-0"
        >
          <ConnectionsTab />
        </TabsContent>
      </Tabs>
      <ResetPasswordModal isOpen={isResetPasswordOpen} onClose={onCloseResetPassword} />
    </div>
  );
}
