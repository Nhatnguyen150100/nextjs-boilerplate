import { useCallback, useRef, useState } from 'react';

export const useTurnstileToken = () => {
  const [token, setToken] = useState('');
  const widgetIdRef = useRef<string | null>(null);

  const setWidgetId = (id: string) => {
    widgetIdRef.current = id;
  };

  const resetToken = useCallback(() => {
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
      setToken('');
    }
  }, []);

  return {
    token,
    setToken,
    setWidgetId,
    resetToken,
  };
};
