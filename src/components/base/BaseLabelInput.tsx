'use client';
import { cn } from '@/lib';
import React, { HTMLAttributes } from 'react';

export default function BaseLabelInput({
  label,
  ...props
}: { label: string } & HTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        'block text-sm font-normal text-label-input',
        props.className,
      )}
      {...props}
    >
      {label}
    </label>
  );
}
