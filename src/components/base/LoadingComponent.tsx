import { cn } from '@/lib/utils';
import React from 'react';

type LoadingSize = 'sm' | 'md' | 'lg' | number;

type Props = {
  size?: LoadingSize;
  color?: string;
  bgColor?: string;
  className?: string;
};

const sizeMap: Record<Exclude<LoadingSize, number>, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-10 w-10 border-4',
  lg: 'h-16 w-16 border-[6px]',
};

export default function LoadingComponent({
  size = 'md',
  color = 'transparent',
  bgColor = 'white',
  className,
}: Props) {
  const sizeClass =
    typeof size === 'number'
      ? ''
      : sizeMap[size as keyof typeof sizeMap] || sizeMap.md;

  const style =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          borderWidth: Math.max(2, size / 10),
          borderTopColor: color,
          borderRightColor: bgColor,
          borderBottomColor: bgColor,
          borderLeftColor: bgColor,
        }
      : {
          borderTopColor: color,
          borderRightColor: bgColor,
          borderBottomColor: bgColor,
          borderLeftColor: bgColor,
        };

  return (
    <div
      className={cn(
        'rounded-full animate-spin ease-linear border-solid',
        sizeClass,
        'border-t-transparent',
        className,
      )}
      style={style}
    />
  );
}
