import { cn } from '@/lib';
import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  classNameLabel?: string;
  label: string;
}

export default function BaseTag({
  label,
  className,
  classNameLabel,
  ...props
}: IProps) {
  return (
    <div
      className={cn(
        'p-[6px] flex flex-row justify-center items-center gap-[6px] bg-primary-foreground rounded-lg min-w-fit',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'sm:text-sm text-xs font-medium text-primary',
          classNameLabel,
        )}
      >
        {label}
      </span>
    </div>
  );
}
