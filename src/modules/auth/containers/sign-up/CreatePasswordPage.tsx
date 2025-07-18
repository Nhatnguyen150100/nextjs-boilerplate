'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import BaseFormInputField from '@/components/base/BaseFormInputField';
import LoadingComponent from '@/components/base/LoadingComponent';
import { useToggle } from '@/hooks';
import { showToast } from '@/lib';
import { Eye, EyeOff } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import useCreatePasswordMutate from '../../hooks/useCreatePasswordMutate';
import { CreatePasswordSchema, TCreatePasswordSchemaType } from '../../schemas';

interface IField {
  name: keyof Omit<TCreatePasswordSchemaType, 'email'>;
  type: 'text' | 'password';
  label: string;
  placeholder: string;
  rightSection?: React.ReactNode;
}

export default function CreatePasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCreatePasswordSchemaType>({
    resolver: zodResolver(CreatePasswordSchema),
  });
  const [isShowPassword, toggleShowPassword] = useToggle();
  const [isShowConfirmPassword, toggleShowConfirmPassword] = useToggle();
  const { mutate, isPending } = useCreatePasswordMutate();

  const searchParams = useSearchParams();

  const userEmail = searchParams.get('email');

  if (!userEmail) {
    throw new Error('Email là bắt buộc để tạo mật khẩu');
  }

  React.useEffect(() => {
    if (userEmail) {
      setValue('email', userEmail);
    }
  }, [userEmail]);

  const fields: IField[] = [
    {
      name: 'password',
      type: isShowPassword ? 'text' : 'password',
      label: 'Tạo mật khẩu',
      placeholder: 'Nhập mật khẩu',
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
    {
      name: 'confirmPassword',
      type: isShowConfirmPassword ? 'text' : 'password',
      label: 'Xác nhận lại mật khẩu',
      placeholder: 'Xác nhận lại mật khẩu',
      rightSection: isShowConfirmPassword ? (
        <Eye
          className="w-4 h-4 cursor-pointer"
          onClick={() => toggleShowConfirmPassword()}
        />
      ) : (
        <EyeOff
          className="w-4 h-4 cursor-pointer"
          onClick={() => toggleShowConfirmPassword()}
        />
      ),
    },
  ];

  const onSubmit = async (data: TCreatePasswordSchemaType) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          showToast.success('Tạo mật khẩu thành công!');
          const params = new URLSearchParams();
          params.set('email', data.email);
          window.location.href = `/auth/sign-in?${params.toString()}`;
        },
      },
    );
  };

  return (
    <form
      className="bg-white rounded-lg sm:p-8 p-5 w-full sm:max-w-md max-w-sm shadow-sm flex flex-col items-center sm:space-y-6 space-y-4"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-primary text-2xl font-semibold text-center">
        Tạo mật khẩu cho tài khoản
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
        <Button type="submit" className="!px-10 h-14" disabled={isPending}>
          <span className="text-white text-base">Xác nhận</span>
          {isPending && <LoadingComponent size="sm" className="ml-2" />}
        </Button>
      </div>
    </form>
  );
}
