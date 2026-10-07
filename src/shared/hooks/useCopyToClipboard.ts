'use client';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

interface UseCopyToClipboardOptions {
  successMessage?: string;
  errorMessage?: string;
  resetMs?: number;
}

export interface UseCopyToClipboardResult {
  copiedKey: string | null;
  copy: (text: string, key?: string) => Promise<void>;
}

export function useCopyToClipboard({
  successMessage,
  errorMessage,
  resetMs,
}: UseCopyToClipboardOptions = {}): UseCopyToClipboardResult {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string, key?: string) => {
      try {
        await navigator.clipboard.writeText(text);
        if (key !== undefined && resetMs !== undefined) {
          setCopiedKey(key);
          setTimeout(() => setCopiedKey(null), resetMs);
        }
        if (successMessage) {
          toast.success(successMessage);
        }
      } catch {
        if (errorMessage) {
          toast.error(errorMessage);
        }
      }
    },
    [successMessage, errorMessage, resetMs]
  );

  return { copiedKey, copy };
}
