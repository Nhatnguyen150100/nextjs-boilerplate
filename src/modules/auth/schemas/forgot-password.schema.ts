import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Hãy nhập email của bạn')
    .max(150, 'Email phải nhỏ hơn 150 ký tự')
    .email({ message: 'Email không hợp lệ' }),
});

export type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;
