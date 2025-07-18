'use client';

import Turnstile from '@/components/base/Turnstile';
import { useTurnstileToken } from '@/hooks/useTurnstileToken';
import { showToast } from '@/lib';
import { useEffect, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

const nodeEnv = process.env.NEXT_PUBLIC_NODE_ENV || 'development';

export default function CloudflareTurnstileProvider({ children }: IProps) {
  const { token, setToken, setWidgetId, resetToken } = useTurnstileToken();
  const [verified, setVerified] = useState(false);

  const verifyToken = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/verify-turnstile', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (data.success) setVerified(true);
      else resetToken();
    } catch (_) {
      showToast.error('Xác thực Cloudflare thất bại, vui lòng thử lại sau');
      resetToken();
    }
  };

  useEffect(() => {
    if (nodeEnv !== 'production') {
      showToast.warning(
        'Cloudflare Turnstile is only available in production.',
      );
      setVerified(true);
      return;
    }
    verifyToken();
  }, [token, resetToken]);

  if (!verified)
    return <Turnstile onSuccess={setToken} onWidgetId={setWidgetId} />;

  return <>{children}</>;
}
