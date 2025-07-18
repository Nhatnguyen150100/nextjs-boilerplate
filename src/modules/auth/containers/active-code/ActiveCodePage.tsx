'use client';

import { Button } from '@/components/ui';
import { showToast } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import NextButton from '../../components/buttons/NextButton';
import InputCodeGroupSingle from '../../components/otp-input/InputCodeGroupSingle';
import useActiveCodeMutate from '../../hooks/useActiveCodeMutate';
import useResendCodeMutate from '../../hooks/useResendCodeMutate';
import { ActiveCodeSchema, TActiveCodeSchema } from '../../schemas';

const OTP_WAIT_TIME = 60;

export default function ActiveCodePage() {
  const [counter, setCounter] = React.useState(0);

  const searchParams = useSearchParams();

  const userEmail = searchParams.get('email');

  if (!userEmail) {
    throw new Error('Email là bắt buộc để kích hoạt tài khoản');
  }

  const { control, handleSubmit } = useForm<TActiveCodeSchema>({
    resolver: zodResolver(ActiveCodeSchema),
    defaultValues: {
      verifyCode: '',
      email: userEmail,
    },
  });

  const { mutate, isPending: isPendingActive } = useActiveCodeMutate();
  const { mutate: mutateResendCode, isPending } = useResendCodeMutate();

  React.useEffect(() => {
    if (counter === 0) return;

    const timer = setInterval(() => {
      setCounter((prev: number) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const onSubmit = async (data: TActiveCodeSchema) => {
    mutate(
      { email: userEmail, verifyCode: data.verifyCode },
      {
        onSuccess: () => {
          showToast.success('Kích hoạt tài khoản thành công!');
          const params = new URLSearchParams();
          params.set('email', userEmail);
          window.location.href = `/auth/create-password?${params.toString()}`;
        },
      },
    );
  };

  const handleResendCode = () => {
    if (!userEmail) {
      showToast.error('Email là bắt buộc để gửi mã kích hoạt');
      return;
    }

    setCounter(OTP_WAIT_TIME);

    mutateResendCode(
      { email: userEmail },
      {
        onSuccess: () => {
          showToast.success('Mã kích hoạt đã được gửi lại đến email của bạn');
        },
        onError: (_) => {
          setCounter(0);
        },
      },
    );
  };

  return (
    <form
      className="bg-white rounded-lg sm:p-10 p-6 w-full sm:max-w-[597px] max-w-sm shadow-sm flex flex-col items-center sm:space-y-10 space-y-6"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-primary sm:text-3xl text-2xl font-semibold text-center">
        Nhập mã kích hoạt
      </h2>

      <div className="flex justify-center">
        <Controller
          name="verifyCode"
          control={control}
          render={({ field, fieldState }) => (
            <InputCodeGroupSingle
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error}
            />
          )}
        />
      </div>

      <p className="text-center text-placeholder sm:text-base text-sm font-medium leading-relaxed sm:px-10 px-4">
        Mã kích hoạt vừa gửi đến email của bạn. Nhập mã để hoàn tất kích hoạt
        tài khoản và tham gia các hoạt động
      </p>

      <div className="flex justify-between items-start w-full">
        <div className="space-y-[10px]">
          <p className="text-sm text-label-gray">Địa chỉ Email của bạn</p>
          <p className="text-label-input font-medium text-base">{userEmail}</p>
        </div>

        <div className="text-right space-y-[10px]">
          <p className="text-sm text-placeholder">Không nhận được mã</p>
          <Button
            onClick={(event) => {
              event.preventDefault();
              if (counter === 0) {
                handleResendCode();
              }
            }}
            variant="noBorder"
            disabled={isPending}
            className={`text-sm font-medium px-5 py-[10px] ${
              counter > 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {counter > 0 ? `Gửi lại sau ${counter}s` : 'Gửi lại'}
          </Button>
        </div>
      </div>

      <NextButton isLoading={isPendingActive} />
    </form>
  );
}
