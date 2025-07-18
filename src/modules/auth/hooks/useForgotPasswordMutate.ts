import { authService } from '@/services';
import { useMutation } from '@tanstack/react-query';

const handleForgotPassword = async (data: {
  email: string;
}) => {
  const rs = await authService.checkEmailForgotPassword({
    email: data.email,
  });
  return rs;
};

export default function useForgotPasswordMutate() {
  return useMutation({
    mutationFn: handleForgotPassword,
  });
}
