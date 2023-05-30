// -------------------------------------------------------------------------- //
//-                           USEPERSISTSTATE HOOK                           -//
// -------------------------------------------------------------------------- //

import { debounce } from '@/utils/logic';
import { useState, useEffect, useRef, useCallback } from 'react';

type UsePersistStateOptions<T> = {
  key: string;
  initialValue: T;
  debounceTime?: number;
  persist?: boolean;
};

export function usePersistState<T>({
  key,
  initialValue,
  debounceTime = 500,
  persist = true,
}: UsePersistStateOptions<T>) {
  const [state, setState] = useState<T>(() => {
    if (!persist) return initialValue;
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const setDebouncedState = useRef(
    debounce((value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
    }, debounceTime)
  ).current;

  useEffect(() => {
    if (persist) setDebouncedState(state);
  }, [state, setDebouncedState]);

  const reset = useCallback(() => {
    localStorage.removeItem(key);
    setState(initialValue);
  }, [initialValue, key]);

  return [state, setState, reset] as const;
}
