'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { AmountInput } from '@/shared/ui/amount-input';
import { COIN_ICON, GAME_POINT_ICON } from '@/shared/config';
import { QUERY_KEYS } from '@/shared/api/query-keys';

import { exchangeWatchToGame } from '../api/exchangeApi';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  watchPointsBalance: string;
  gamePointsBalance: string;
}

export function PointsExchangeModal({
  open,
  onOpenChange,
  watchPointsBalance,
  gamePointsBalance,
}: Props) {
  const [amount, setAmount] = useState('');
  const queryClient = useQueryClient();

  const { mutate: exchange, isPending } = useMutation({
    mutationFn: (exchangeAmount: number) => exchangeWatchToGame({ amount: exchangeAmount }),
    onSuccess: () => {
      toast.success('Points exchanged successfully');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      onOpenChange(false);
      setAmount('');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Failed to exchange points');
    },
  });

  const handleConfirm = () => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (numAmount > Number(watchPointsBalance)) {
      toast.error('Insufficient Watch Points');
      return;
    }
    exchange(numAmount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-32px)] max-w-[500px] bg-bg-primary border-auth-surface p-6 sm:p-8"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onOpenChange(false)}
          className="absolute right-[20px] top-[20px] size-[20px] text-auth-text-secondary hover:bg-transparent hover:text-auth-text z-20"
          aria-label="Close form"
        >
          <X className="size-[20px]" />
        </Button>

        <div className="flex flex-col items-center">
          <Image
            src="/two-coins.webp"
            alt="Points Exchange"
            width={120}
            height={120}
            className="mb-4"
          />

          <DialogTitle className="text-xl font-bold mb-2">Points exchange</DialogTitle>
          <DialogDescription className="text-center text-auth-text-secondary text-sm mb-8 max-w-[340px]">
            Convert your Watch Points into Game Points to earn rewards and enhance your gameplay.
          </DialogDescription>

          <div className="flex items-center justify-center gap-4 bg-auth-surface rounded-xl py-3 px-4 w-full mb-8">
            <div className="flex items-center gap-2">
              <Image src={COIN_ICON.SRC} alt="Watch Point" width={20} height={20} />
              <span className="text-sm font-semibold">
                1 <span className="text-auth-text-secondary font-normal">Watch point</span>
              </span>
            </div>
            <span className="font-bold text-lg">=</span>
            <div className="flex items-center gap-2">
              <Image src={GAME_POINT_ICON.SRC} alt="Game Point" width={20} height={20} />
              <span className="text-sm font-semibold">
                1 <span className="text-auth-text-secondary font-normal">Game point</span>
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-auth-text-secondary">You give</span>
              <AmountInput
                value={amount}
                onValueChange={setAmount}
                iconSrc={COIN_ICON.SRC}
                inputMode="numeric"
                trailing={
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-border-default/25 rounded-md text-xs text-auth-text-secondary">
                    Balance <Image src={COIN_ICON.SRC} alt="" width={12} height={12} />{' '}
                    <span className="text-white font-medium">
                      {Number(watchPointsBalance).toLocaleString()}
                    </span>
                  </div>
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-auth-text-secondary">You will receive</span>
              <AmountInput
                value={amount || '0'}
                readOnly
                iconSrc={GAME_POINT_ICON.SRC}
                trailing={
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-border-default/25 rounded-md text-xs text-auth-text-secondary">
                    Balance <Image src={GAME_POINT_ICON.SRC} alt="" width={12} height={12} />{' '}
                    <span className="text-white font-medium">
                      {Number(gamePointsBalance).toLocaleString()}
                    </span>
                  </div>
                }
              />
            </div>
          </div>

          <Button
            className="w-full h-12 text-base font-bold"
            onClick={handleConfirm}
            isLoading={isPending}
            disabled={!amount || Number(amount) <= 0}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
