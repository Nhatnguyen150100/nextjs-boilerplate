import { useAuthStore } from '@/stores';

export const useCheckIsNotCurrentUser = (userId: string) => {
  const currentUser = useAuthStore((state) => state.user);

  return currentUser?.id !== userId;
};
