import { z } from 'zod';

export const CreatePasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Hãy nhập email của bạn')
      .max(150, 'Email phải nhỏ hơn 150 ký tự')
      .email({ message: 'Email không hợp lệ' }),
    password: z
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(50, 'Mật khẩu phải nhỏ hơn 50 ký tự'),
    confirmPassword: z
      .string()
      .min(6, 'Mật khẩu xác nhận phải có ít nhất 6 ký tự')
      .max(50, 'Mật khẩu xác nhận phải nhỏ hơn 50 ký tự'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp với mật khẩu',
    path: ['confirmPassword'],
  });

export type TCreatePasswordSchemaType = z.infer<typeof CreatePasswordSchema>;
