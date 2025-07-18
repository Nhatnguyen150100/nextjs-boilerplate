import { authService } from '@/services';
import { useMutation } from '@tanstack/react-query';

const handleCreatePassword = async (data: {
  email: string;
  password: string;
}) => {
  const rs = await authService.createPassword({
    email: data.email,
    password: data.password,
  });
  return rs;
};

export default function useCreatePasswordMutate() {
  return useMutation({
    mutationFn: handleCreatePassword,
  });
}
