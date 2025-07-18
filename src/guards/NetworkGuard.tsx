'use client';

import { useNetworkStatus } from '@/hooks';

export function NetworkGuard({ children }: { children: React.ReactNode }) {
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    window.location.href = '/no-internet';
    return null;
  }

  return <>{children}</>;
}
