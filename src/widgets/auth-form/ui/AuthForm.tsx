'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Button } from '@/shared/ui/button';
import { TAB_LABELS } from '../model/constants';
import { AuthFormBody } from './AuthFormBody';
import { VerifyEmailForm } from './VerifyEmailForm';
import type { AuthTab } from '../model/types';

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<AuthTab>('sign-in');
  const { verificationToken, email } = useAuthStore();

  if (verificationToken) {
    return <VerifyEmailForm email={email} />;
  }

  return (
    <div className="relative flex w-[500px] flex-col items-center p-[40px] gap-[32px]">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-[20px] top-[20px] size-[20px] text-auth-text-secondary hover:bg-transparent hover:text-auth-text"
        aria-label="Close form"
      >
        <X className="size-[20px]" />
      </Button>

      <Tabs
        className="w-full"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as AuthTab)}
      >
        <TabsList className="auth-tabs-nav mb-[20px] h-[60px] w-full gap-[8px] rounded-[12px] bg-auth-bg p-[8px]">
          <TabsTrigger
            value="sign-in"
            className="h-[44px] flex-1 rounded-[8px] text-base font-medium"
          >
            {TAB_LABELS['sign-in']}
          </TabsTrigger>
          <TabsTrigger
            value="sign-up"
            className="h-[44px] flex-1 rounded-[8px] text-base font-medium"
          >
            {TAB_LABELS['sign-up']}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <AuthFormBody type="sign-in" />
        </TabsContent>
        <TabsContent value="sign-up">
          <AuthFormBody type="sign-up" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
