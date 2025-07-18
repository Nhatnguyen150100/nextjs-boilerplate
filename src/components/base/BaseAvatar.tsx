'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DEFINE_DEFAULT_AVATAR } from '@/constants/avatar';
import { useIsMobile } from '@/hooks';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface IProps {
  src?: string | null;
  fallback?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'base' | 'xl';
  className?: string;
  onClick?: () => void;
}

export function BaseAvatar({
  onClick,
  src,
  fallback,
  alt = 'Avatar',
  size = 'md',
  className,
}: IProps) {
  const isMobile = useIsMobile();

  const sizeClasses = {
    sm: isMobile ? 'h-6 w-6' : 'h-8 w-8',
    base: isMobile ? 'h-[28px] w-[38px]' : 'h-[30px] w-[30px]',
    md: isMobile ? 'h-7 w-7' : 'h-10 w-10',
    lg: isMobile ? 'h-10 w-10' : 'h-12 w-12',
    xl: isMobile ? 'h-[40px] w-[40px]' : 'h-[60px] w-[60px]',
  };

  return (
    <Avatar
      className={cn(sizeClasses[size], 'hover:cursor-pointer', className)}
      onClick={onClick}
    >
      {src && (
        <AvatarImage
          src={src}
          alt={alt}
          onError={(e) => (e.currentTarget.src = DEFINE_DEFAULT_AVATAR)}
        />
      )}
      <AvatarFallback className="text-xl font-medium bg-muted text-muted-foreground">
        {fallback?.split(' ')[fallback.split(' ').length - 1]?.charAt(0) || 'A'}
      </AvatarFallback>
    </Avatar>
  );
}
