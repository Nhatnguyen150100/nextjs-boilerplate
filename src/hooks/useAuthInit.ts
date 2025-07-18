'use client';

import { DEFINE_KEY_TOKEN, PUBLIC_ROUTES } from '@/constants';
import { cookiesStore } from '@/plugins/axiosRequest';
import { useAuthStore } from '@/stores/AuthStore';
import isChildUrl from '@/utils/functions/check-active-router';
import onRemoveAllToken from '@/utils/functions/on-remove-token';
import { matchRoute } from '@/utils/helpers';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import useGetUserProfile from './useGetUserProfile';

export function useAuthInit() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { setUser } = useAuthStore();

  const isPublicRoute = useMemo(() => {
    return PUBLIC_ROUTES.some((route) => {
      if (route.endsWith('/**')) {
        const baseRoute = route.replace('/**', '');
        return isChildUrl(baseRoute, pathname);
      }
      return matchRoute(pathname, route);
    });
  }, [pathname]);

  const email = session?.user?.email;
  const userId = session?.user?.id;
  const accessToken = session?.accessToken;

  const isQueryEnabled = useMemo(() => {
    return !!userId && status === 'authenticated' && !!email && !!userId;
  }, [session, status, email, userId]);

  useEffect(() => {
    if (accessToken) {
      cookiesStore.set(DEFINE_KEY_TOKEN.accessToken, accessToken);
    }
  }, [accessToken]);

  const { data, isLoading, isError } = useGetUserProfile(
    userId,
    isQueryEnabled,
  );

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      signOut();
      onRemoveAllToken();
    }
  }, [isError]);

  return {
    isLoading,
    isPublicRoute,
  };
}
