'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import BaseFormInputField from '@/components/base/BaseFormInputField';
import { DEFINE_ALL_ROUTERS } from '@/constants';
import { useToggle } from '@/hooks';
import { showToast } from '@/lib';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import NextButton from '../../components/buttons/NextButton';
import { SignInSchema, TSignInSchemaType } from '../../schemas';

interface IField {
  name: keyof TSignInSchemaType;
  label: string;
  type?: string;
  placeholder: string;
  rightSection?: React.ReactNode;
}

export default function SignInPage() {
  const router = useRouter();
  const [isShowPassword, toggleShowPassword] = useToggle();
  const searchParams = useSearchParams();

  const userEmail = searchParams.get('email');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: userEmail || '',
      password: '',
    },
  });

  const fields: IField[] = [
    {
      name: 'email',
      label: 'Email của bạn',
      placeholder: 'Nhập email của bạn',
    },
    {
      name: 'password',
      label: 'Mật khẩu',
      type: isShowPassword ? 'text' : 'password',
      placeholder: 'Nhập mật khẩu của bạn',
      rightSection: isShowPassword ? (
        <Eye
          className="w-4 h-4 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <EyeOff
          className="w-4 h-4 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ),
    },
  ];

  const handleSignIn = async (data: TSignInSchemaType) => {
    const rs = await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: searchParams.get('callbackUrl') || DEFINE_ALL_ROUTERS.HOME,
    });
    if (!rs?.ok) {
      throw new Error(rs?.error || 'Lỗi đăng nhập, vui liệu thử lại sau');
    }
    return rs;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TSignInSchemaType) => handleSignIn(data),
    onSuccess: (res) => {
      if (res?.ok) {
        router.push(res.url || DEFINE_ALL_ROUTERS.HOME);
      }
    },
    onError: (err) => {
      showToast.error(err.message);
    },
  });

  const onSubmit = async (data: TSignInSchemaType) => {
    mutate(data);
  };

  return (
    <form
      className="bg-white rounded-lg sm:p-8 p-5 w-full sm:max-w-md max-w-sm shadow-sm flex flex-col items-center sm:space-y-5 space-y-4"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-primary sm:text-[30px] text-2xl font-semibold text-center">
        Đăng nhập
      </h2>

      {fields.map((field) => (
        <BaseFormInputField
          key={field.name}
          register={register}
          error={errors[field.name]}
          {...field}
        />
      ))}

      <Link
        href={DEFINE_ALL_ROUTERS.FORGOT_PASSWORD}
        className="text-primary text-sm underline text-end w-full"
        rel="noopener noreferrer"
      >
        Quên mật khẩu?
      </Link>

      <div className="w-full flex justify-center items-center">
        <NextButton type="submit" isLoading={isPending} />
      </div>

      <div className="w-full flex justify-center items-center space-x-2">
        <span className="text-gray-500 text-sm">Bạn chưa có tài khoản?</span>
        <Link
          href={DEFINE_ALL_ROUTERS.SIGN_UP}
          className="text-primary text-sm hover:underline"
          rel="noopener noreferrer"
        >
          Đăng ký ngay
        </Link>
      </div>
    </form>
  );
}
