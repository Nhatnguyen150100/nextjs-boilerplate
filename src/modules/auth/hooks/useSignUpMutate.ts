import { authService } from '@/services';
import { useMutation } from '@tanstack/react-query';

const handleSignUp = async (data: {
  phoneNumber: string;
  email: string;
  name: string;
}) => {
  const rs = await authService.checkEmail({
    phoneNumber: data.phoneNumber,
    email: data.email,
    name: data.name,
  });
  return rs;
};

export default function useSignUpMutate() {
  return useMutation({
    mutationFn: handleSignUp,
  });
}
