import NodataIcon from '@/assets/svgs/no-data.svg';
import { cn } from '@/lib';
import Image from 'next/image';
import React from 'react';

type IProps = {
  message?: string;
  classNameLabel?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export default function Nodata({
  classNameLabel,
  message = 'Không có dữ liệu',
  ...props
}: IProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full space-y-1 bg-white rounded-2xl py-5">
      <Image
        src={NodataIcon}
        alt="no data"
        {...props}
        className={cn('w-[120px] h-[120px]', props.className)}
        width={120}
        height={120}
      />
      <span
        className={cn(
          'text-placeholder sm:text-base text-sm font-semibold',
          classNameLabel,
        )}
      >
        {message}
      </span>
    </div>
  );
}
