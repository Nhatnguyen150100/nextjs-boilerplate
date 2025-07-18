'use client';
import { useCallback, useState } from 'react';

export const useToggle = (
  initial = false,
): [boolean, () => void, (value: boolean) => void] => {
  const [state, setState] = useState(initial);

  const toggle = useCallback(() => setState((prev) => !prev), []);
  const set = useCallback((value: boolean) => setState(value), []);

  return [state, toggle, set];
};
