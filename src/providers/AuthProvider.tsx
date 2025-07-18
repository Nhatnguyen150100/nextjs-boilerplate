'use client';

import LoadingPage from '@/components/base/LoadingPage';
import { useAuthInit } from '@/hooks/useAuthInit';
import { useSession } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const { status } = useSession();
  const { isLoading } = useAuthInit();

  const isShowLoading = isLoading || status === 'loading';

  if (isShowLoading) return <LoadingPage />;

  return children;
}
