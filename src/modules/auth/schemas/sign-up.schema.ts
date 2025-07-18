import { z } from 'zod';

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, 'Hãy nhập tên của bạn')
    .max(50, 'Tên phải nhỏ hơn 50 ký tự'),
  email: z
    .string()
    .min(1, 'Hãy nhập email của bạn')
    .max(150, 'Email phải nhỏ hơn 150 ký tự')
    .email({ message: 'Email không hợp lệ' }),
  phoneNumber: z
    .string()
    .min(1, 'Hãy nhập số điện thoại của bạn')
    .max(15, 'Số điện thoại phải nhỏ hơn 15 ký tự')
    .regex(/^\d+$/, 'Số điện thoại chỉ chứa chữ số'),
});

export type TSignUpSchemaType = z.infer<typeof SignUpSchema>;
