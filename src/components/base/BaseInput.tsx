'use client';

import { Input as ShadcnInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';
import { Label } from '../ui/label';
import Visibility from './visibility';

type Props = {
  label?: string | React.ReactElement;
  placeholder?: string;
  error?: FieldError;
  helperText?: string;
  className?: string;
  containerClassName?: string;
  rightSection?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const BaseInput = ({
  label,
  error,
  helperText,
  className,
  containerClassName,
  disabled,
  ...props
}: Props) => {
  return (
    <div className={cn('space-y-1.5 w-full', containerClassName)}>
      {label && (
        <div className="flex justify-between items-center">
          {typeof label === 'string' ? (
            <Label
              className={cn('sm:text-sm text-xs font-medium text-label-input')}
            >
              {label}
            </Label>
          ) : (
            label
          )}
        </div>
      )}

      <div className="relative">
        <ShadcnInput
          className={cn(
            'rounded-[8px] border-[0.5px] border-[var(--border)] px-4 py-3 text-base placeholder:text-placeholder placeholder:font-normal bg-white',
            'sm:text-base text-sm text-primary font-medium',
            'hover:border-primary',
            error && '!border-primary',
            className,
          )}
          rightSection={props.rightSection}
          {...props}
        />
      </div>
      <Visibility visibility={error || helperText}>
        <div className="flex items-start gap-1.5">
          {error ? (
            <p className="text-xs text-primary">{error.message}</p>
          ) : helperText ? (
            <p className="text-xs text-primary">{helperText}</p>
          ) : null}
        </div>
      </Visibility>
    </div>
  );
};
