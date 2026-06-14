import { type ChangeEvent, useCallback } from 'react';

interface UseNumberOfBetsReturn {
  handleNumberOfBetsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInfinityClick: () => void;
}

export function useNumberOfBets(
  setNumberOfBets: (val: string) => void,
  infinityValue: string
): UseNumberOfBetsReturn {
  const handleNumberOfBetsChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNumberOfBets(event.target.value.replace(/\D/g, ''));
    },
    [setNumberOfBets]
  );

  const handleInfinityClick = useCallback(() => {
    setNumberOfBets(infinityValue);
  }, [setNumberOfBets, infinityValue]);

  return { handleNumberOfBetsChange, handleInfinityClick };
}
