'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { COPY_RESET_MS, FAIRNESS_LABELS } from '../model/constants';

interface Props {
  label: string;
  value: string;
}

export function CopyInput({ label, value }: Props) {
  const [copied, setCopied] = useState<boolean>(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_RESET_MS);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <span className="font-outfit font-light text-sm text-brand-text-light select-none">
        {label}
      </span>
      <div className="flex w-full h-11 items-center justify-between px-3 bg-bg-primary border border-border-default rounded-lg relative">
        <span className="font-outfit text-sm text-brand-text-light overflow-hidden text-ellipsis whitespace-nowrap pr-8 select-all">
          {value}
        </span>
        <Button
          variant="tab"
          size="none"
          onClick={handleCopy}
          className="absolute right-3 text-auth-text-muted hover:text-brand-text-white transition-colors cursor-pointer flex items-center justify-center"
          title={FAIRNESS_LABELS.copyToClipboard}
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <Check className="w-5 h-5 text-brand-green-to" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
