'use client';
import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { Tabs, TabsContent } from '@/shared/ui/tabs';
import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { COIN_ICON } from '@/shared/config';
import { useUserProfileWindow } from '../model/useUserProfileWindow';
import { TAB_LABELS, TAB_LIST, PROFILE_WINDOW_TABS, TAB_ICONS } from '../model/constants';
import { ProfileTab } from './ProfileTab';
import { HistoryTab } from './HistoryTab';
import { formatUsername } from '../model/formatUsername';

export function UserProfileWindow() {
  const { user, gamePointsBalance, activeTab, onTabChange } = useUserProfileWindow();

  if (!user) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-8 pt-8 pb-6">
        <div className="flex items-center gap-5">
          <Avatar className="size-20">
            <AvatarImage src={user.profileImgUrl} alt={user.username} />
            <AvatarFallback className="text-2xl">{formatUsername(user.username)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">{user.username}</span>
            <span className="text-sm text-muted-foreground">{user.email}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-primary px-4 py-2.5">
          <Image
            src={COIN_ICON.SRC}
            alt={COIN_ICON.ALT}
            width={COIN_ICON.SIZE_BALANCE}
            height={COIN_ICON.SIZE_BALANCE}
          />
          <span className="text-sm font-semibold">{gamePointsBalance}</span>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={onTabChange}>
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
        <TabsContent value={PROFILE_WINDOW_TABS.PROFILE} className="px-8 py-6 m-0">
          <ProfileTab user={user} />
        </TabsContent>
        <TabsContent value={PROFILE_WINDOW_TABS.BETS_HISTORY} className="px-8 py-6 m-0">
          <HistoryTab user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
