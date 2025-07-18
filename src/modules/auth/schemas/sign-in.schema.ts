import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, 'Hãy nhập email của bạn')
    .max(150, 'Email phải nhỏ hơn 150 ký tự')
    .email({ message: 'Email không hợp lệ' }),
  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(50, 'Mật khẩu phải nhỏ hơn 50 ký tự'),
});

export type TSignInSchemaType = z.infer<typeof SignInSchema>;
