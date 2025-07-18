import { authService } from '@/services';
import { useMutation } from '@tanstack/react-query';

const handleResendCode = async (data: { email: string }) => {
  const rs = await authService.resendCode({
    email: data.email,
  });
  return rs;
};

export default function useResendCodeMutate() {
  return useMutation({
    mutationFn: handleResendCode,
  });
}
