'use client';

import { IOptionSelect } from '@/types';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import BaseLabelInput from './BaseLabelInput';
import { BaseSelect } from './BaseSelect';

type FormSelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  option: IOptionSelect[];
  error?: any;
  className?: string;
  containerClassName?: string;
};

export default function BaseFormSelectField<T extends FieldValues>({
  control,
  name,
  option,
  label,
  placeholder,
  error,
  className,
  containerClassName,
}: FormSelectFieldProps<T>) {
  return (
    <div className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <BaseSelect
            options={option}
            label={<BaseLabelInput label={label} />}
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            error={error}
            className={className}
            containerClassName={containerClassName}
          />
        )}
      />
    </div>
  );
}
