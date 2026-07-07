'use client';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { ConfigureAutoBetForm } from './ConfigureAutoBetForm';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfigureAutoBetModal({ isOpen, onOpenChange }: Props) {
  function handleClose() {
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex w-full max-w-[calc(100%-2rem)] select-none flex-col gap-6 rounded-[24px] border border-border-default bg-page-bg p-10 text-brand-text-white shadow-2xl sm:w-[550px] sm:max-w-[550px]"
      >
        <Button
          variant="tab"
          size="none"
          onClick={handleClose}
          className="absolute right-5 top-5 flex h-6 w-6 items-center justify-center text-brand-text-light transition-colors hover:text-brand-text-white"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </Button>
        <ConfigureAutoBetForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
