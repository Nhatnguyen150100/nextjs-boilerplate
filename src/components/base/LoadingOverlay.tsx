'use client';

import useRemoveScrollLock from '@/hooks/useRemoveScrollLock';
import { cn } from '@/lib/utils';
import React from 'react';

type LoadingOverlayProps = {
  show?: boolean;
  text?: string;
  className?: string;
};

export default function LoadingOverlay({
  show = true,
  text = 'Đang tải dữ liệu...',
  className,
}: LoadingOverlayProps) {
  useRemoveScrollLock();
  if (!show) return null;

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/60  transition-all',
        className,
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="loader ease-linear rounded-full border-8 border-t-transparent border-primary h-16 w-16 animate-spin" />
        <p className="text-primary text-sm font-medium">{text}</p>
      </div>
    </div>
  );
}
