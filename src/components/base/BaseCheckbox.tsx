'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import * as React from 'react';

interface IProps extends CheckboxProps {
  label?: string;
  id?: string;
  className?: string;
  labelClassName?: string;
}

export function BaseCheckbox({
  id,
  label,
  className,
  labelClassName,
  ...props
}: IProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} className={className} {...props} />
      {label && (
        <Label htmlFor={id} className={cn('text-sm', labelClassName)}>
          {label}
        </Label>
      )}
    </div>
  );
}
