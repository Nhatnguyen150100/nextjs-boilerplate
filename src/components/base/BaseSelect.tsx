'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useRemoveScrollLock from '@/hooks/useRemoveScrollLock';
import { cn } from '@/lib';
import { IOptionSelect } from '@/types';
import { FieldError } from 'react-hook-form';
import { Label } from '../ui';
import Nodata from './Nodata';
import Visibility from './visibility';

interface IProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'value' | 'defaultValue' | 'onChange'
  > {
  options: IOptionSelect[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: FieldError;
  helperText?: string;
  containerClassName?: string;
  label?: string | React.ReactElement;
}

export function BaseSelect({
  options,
  label,
  value,
  onChange,
  error,
  helperText,
  placeholder = 'Chọn...',
  disabled = false,
  className,
  containerClassName,
  ...props
}: IProps) {
  useRemoveScrollLock();

  return (
    <div className={cn('space-y-1.5', containerClassName)}>
      {label && (
        <div className="flex justify-between items-center">
          {typeof label === 'string' ? (
            <Label className="sm:text-sm text-xs font-medium text-label-input">
              {label}
            </Label>
          ) : (
            label
          )}
        </div>
      )}

      <div className="relative">
        <Select
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          {...Object.fromEntries(
            Object.entries(props).filter(([key]) => key !== 'dir'),
          )}
        >
          <SelectTrigger className={cn(className, error && '!border-primary')}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <Visibility
              visibility={options.length > 0}
              suspenseComponent={
                <Nodata classNameLabel="sm:text-xs" className="h-10 w-10" />
              }
            >
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </Visibility>
          </SelectContent>
        </Select>
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
}
