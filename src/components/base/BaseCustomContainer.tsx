'use client';
import { useScrollToTop } from '@/hooks';
import { cn } from '@/lib';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const BaseCustomContainer = ({ children, className }: IProps) => {
  useScrollToTop();
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={cn(
          'w-full sm:p-10 p-5',
          'mx-auto',
          'max-w-full',
          '2xl:max-w-[1440px]',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
