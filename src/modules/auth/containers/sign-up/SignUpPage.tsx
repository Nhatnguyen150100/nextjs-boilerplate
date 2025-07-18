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
import useSignUpMutate from '../../hooks/useSignUpMutate';
import { SignUpSchema, TSignUpSchemaType } from '../../schemas';

const fields: IField<keyof TSignUpSchemaType>[] = [
  {
    name: 'name',
    label: 'Tên hiển thị',
    placeholder: 'Nhập tên hiển thị của bạn',
  },
  {
    name: 'phoneNumber',
    label: 'Số điện thoại',
    placeholder: 'Nhập số điện thoại của bạn',
  },
  {
    name: 'email',
    label: 'Email của bạn',
    placeholder: 'Nhập email của bạn',
  },
];

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });
  const router = useRouter();

  const { mutate, isPending } = useSignUpMutate();

  const onSubmit = async (data: TSignUpSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        showToast.success(
          'Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.',
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
        Đăng ký tài khoản
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
