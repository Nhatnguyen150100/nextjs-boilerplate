import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import React from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function NextButton({ isLoading, ...props }: IProps) {
  return (
    <Button
      className={cn(
        '!px-6 md:!px-10 h-12 md:h-[60px] w-full md:w-auto',
        props.className,
      )}
      {...props}
      isLoading={isLoading}
    >
      <span className="text-white text-sm md:text-base">Tiếp tục</span>
      {!isLoading && <ArrowRight className="ml-2 !w-4 !h-4 md:!w-6 md:!h-6" />}
    </Button>
  );
}
