'use client';
import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shared/ui/dialog';
import { Logo } from '@/shared/ui/logo';
import { AUTH_TABS } from '../model/constants';
import { SignInFormBody } from './SignInFormBody';
import { SignUpFormBody } from './SignUpFormBody';
import { SocialAuthButtons } from './SocialAuthButtons';
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
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-32px)] lg:w-full max-w-[420px] sm:max-w-[420px] lg:max-w-[840px] p-0 overflow-hidden border-auth-surface"
      >
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <DialogDescription className="sr-only">Sign in or create an account</DialogDescription>
        {verificationToken ? (
          <VerifyEmailForm email={email} />
        ) : (
          <div className="flex w-full overflow-hidden bg-bg-primary rounded-xl">
            <div className="relative hidden w-[420px] lg:flex flex-col items-center justify-start p-[40px] shrink-0 border-r border-auth-surface overflow-hidden">
              <Image
                src="/auth-bg-clean.webp"
                alt=""
                fill
                className="object-cover absolute inset-0 z-0 pointer-events-none"
              />
              <div className="relative z-10 w-full flex justify-center mt-4">
                <Logo size="lg" className="h-[40px] w-auto" />
              </div>
              <Image
                src="/hero/character.webp"
                alt="Character"
                width={850}
                height={850}
                className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-10 pointer-events-none object-contain"
                priority
              />
            </div>
            <div className="relative flex w-full lg:w-[420px] h-[580px] max-h-[calc(100dvh-2rem)] flex-col items-center p-[24px] lg:p-[40px] gap-[32px] shrink-0 overflow-y-auto">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={closeAuthForm}
                className="absolute right-[20px] top-[20px] size-[20px] text-auth-text-secondary hover:bg-transparent hover:text-auth-text z-20"
                aria-label="Close form"
              >
                <X className="size-[20px]" />
              </Button>
              <div className="w-full">
                <SegmentedTabs
                  items={AUTH_TABS}
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="mb-[20px] h-[60px] bg-auth-bg p-[8px]"
                />
                <div
                  key={activeTab}
                  className="w-full animate-in fade-in zoom-in-95 duration-300 ease-out"
                >
                  {activeTab === 'sign-in' && <SignInFormBody />}
                  {activeTab === 'sign-up' && <SignUpFormBody />}
                </div>
              </div>
              <SocialAuthButtons />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
