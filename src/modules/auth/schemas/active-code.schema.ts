import { z } from 'zod';

export const ActiveCodeSchema = z.object({
  email: z
    .string()
    .min(1, 'Hãy nhập email của bạn')
    .max(150, 'Email phải nhỏ hơn 150 ký tự')
    .email({ message: 'Email không hợp lệ' }),
  verifyCode: z
    .string()
    .length(6, 'Mã kích hoạt phải gồm 6 ký tự')
    .regex(/^[0-9]+$/, 'Mã kích hoạt chỉ chứa chữ số'),
});

export type TActiveCodeSchema = z.infer<typeof ActiveCodeSchema>;
