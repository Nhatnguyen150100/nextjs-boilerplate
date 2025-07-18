import { GET_PROFILE_KEY } from '@/constants';
import { userService } from '@/services';
import { useQuery } from '@tanstack/react-query';

const handleGetUserProfile = async (id: string) => {
  const res = await userService.getUserInfo(id);
  return res.data;
};

export default function useGetUserProfile(id?: string, enable?: boolean) {
  return useQuery({
    queryKey: [GET_PROFILE_KEY, id],
    queryFn: () => handleGetUserProfile(id!),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: enable ?? Boolean(id),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}
