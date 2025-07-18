'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import BaseFormInputField from '@/components/base/BaseFormInputField';
import { DEFINE_ALL_ROUTERS } from '@/constants';
import { showToast } from '@/lib';
import { IField } from '@/types/field';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NextButton from '../../components/buttons/NextButton';
import useForgotPasswordMutate from '../../hooks/useForgotPasswordMutate';
import { ForgotPasswordSchema, TForgotPasswordSchema } from '../../schemas';

const fields: IField<keyof TForgotPasswordSchema>[] = [
  {
    name: 'email',
    label: 'Email của bạn',
    placeholder: 'Nhập email của bạn',
  },
];

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const router = useRouter();

  const { mutate, isPending } = useForgotPasswordMutate();

  const onSubmit = async (data: TForgotPasswordSchema) => {
    mutate(data, {
      onSuccess: () => {
        showToast.success(
          'Đã gửi yêu cầu đặt lại mật khẩu! Vui lòng kiểm tra email của bạn.',
        );
        const params = new URLSearchParams();
        params.set('email', data.email);
        router.push(`/auth/active-account?${params.toString()}`);
      },
    });
  };

  return (
    <form
      className="bg-white rounded-lg sm:p-8 p-5 w-full sm:max-w-md max-w-sm shadow-sm flex flex-col items-center sm:space-y-6 space-y-4"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-primary sm:text-[30px] text-2xl font-semibold text-center">
        Nhập Email đăng ký
      </h2>

      {fields.map((field) => (
        <BaseFormInputField
          key={field.name}
          register={register}
          error={errors[field.name]}
          {...field}
        />
      ))}

      <div className="w-full flex justify-center">
        <NextButton type="submit" isLoading={isPending} />
      </div>

      <div className="w-full flex justify-center items-center space-x-2">
        <span className="text-gray-500 text-sm">Bạn đã có tài khoản?</span>
        <Link
          href={DEFINE_ALL_ROUTERS.SIGN_IN}
          className="text-primary text-sm hover:underline"
          rel="noopener noreferrer"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </form>
  );
}
