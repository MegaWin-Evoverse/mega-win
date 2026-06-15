'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shared/ui/dialog';
import { AUTH_TABS } from '../model/constants';
import { AuthFormBody } from './AuthFormBody';
import { VerifyEmailForm } from './VerifyEmailForm';
import type { AuthTab } from '../model/types';

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<AuthTab>('sign-in');
  const isAuthFormOpen = useAuthStore((state) => state.isAuthFormOpen);
  const verificationToken = useAuthStore((state) => state.verificationToken);
  const email = useAuthStore((state) => state.email);
  const closeAuthForm = useAuthStore((state) => state.closeAuthForm);

  return (
    <Dialog open={isAuthFormOpen} onOpenChange={(open) => !open && closeAuthForm()}>
      <DialogContent showCloseButton={false} className="w-[500px] max-w-[500px] p-0">
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <DialogDescription className="sr-only">Sign in or create an account</DialogDescription>

        {verificationToken && <VerifyEmailForm email={email} />}

        <div className="relative flex w-full flex-col items-center p-[40px] gap-[32px]">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={closeAuthForm}
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
              {AUTH_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="h-[44px] flex-1 rounded-[8px] text-base font-medium"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {AUTH_TABS.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <AuthFormBody type={tab.value} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
