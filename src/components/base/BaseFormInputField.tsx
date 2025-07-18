import { BaseInput } from '@/components/base/BaseInput';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import BaseLabelInput from './BaseLabelInput';

type FormInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: any;
  rightSection?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function BaseFormInputField<T extends FieldValues>({
  name,
  label,
  placeholder,
  register,
  error,
  ...props
}: FormInputFieldProps<T>) {
  return (
    <div className="w-full">
      <BaseInput
        label={<BaseLabelInput label={label} />}
        placeholder={placeholder}
        className="py-2 md:py-3 text-xs sm:text-base"
        {...register(name)}
        error={error}
        {...props}
      />
    </div>
  );
}
