'use client';

import { BaseInput } from '@/components/base/BaseInput';
import { cn } from '@/lib/utils';
import { Plus, X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '../ui';
import BaseLabelInput from './BaseLabelInput';

interface BaseArrayInputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
}

export default function BaseArrayInputField({
  name,
  label,
  placeholder,
  className,
}: BaseArrayInputFieldProps) {
  const { control, register, formState } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const error = formState.errors[name];

  return (
    <div className={cn('space-y-2 w-full', className)}>
      <BaseLabelInput label={label} />
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2 w-full">
          <BaseInput
            placeholder={`${placeholder || 'Nhập giá trị'} #${index + 1}`}
            containerClassName="flex-1 md:py-1 text-sm sm:text-base"
            error={(error as Record<number, any>)?.[index]}
            {...register(`${name}.${index}`)}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => remove(index)}
            className="sm:w-8 sm:h-8 h-6 w-6 hover:text-primary transition rounded-full"
          >
            <X className="sm:w-4 sm:h-4 h-3 w-3" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="ghost"
        onClick={() => append('')}
        className="w-full border border-dashed border-gray-300 rounded-md py-2 px-3 flex items-center gap-2 text-gray-500 hover:border-gray-400 hover:text-black transition mt-4"
      >
        <Plus className="sm:w-4 sm:h-4 w-3 h-3" />
        <span>Thêm mục</span>
      </Button>
    </div>
  );
}
