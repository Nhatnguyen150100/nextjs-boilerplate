import { authService } from '@/services';
import { useMutation } from '@tanstack/react-query';

const handleActiveCode = async (data: {
  email: string;
  verifyCode: string;
}) => {
  const rs = await authService.verifyEmail({
    email: data.email,
    verifyCode: data.verifyCode,
  });
  return rs;
};

export default function useActiveCodeMutate() {
  return useMutation({
    mutationFn: handleActiveCode,
  });
}
