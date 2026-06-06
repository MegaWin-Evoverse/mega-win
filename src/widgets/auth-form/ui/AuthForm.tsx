'use client';

import { useState } from 'react';
import { useAuthStore } from '@/features/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
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
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AuthTab)}>
      <TabsList className="w-full mb-6 h-[60px] gap-1 rounded-[12px] bg-background/10 p-1">
        <TabsTrigger
          value="sign-in"
          className="h-[52px] flex-1 rounded-[10px] text-base font-medium"
        >
          {TAB_LABELS['sign-in']}
        </TabsTrigger>
        <TabsTrigger
          value="sign-up"
          className="h-[52px] flex-1 rounded-[10px] text-base font-medium"
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
  );
}
