'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useRemoveScrollLock from '@/hooks/useRemoveScrollLock';
import { cn } from '@/lib/utils';
import * as React from 'react';

export interface BaseModalProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  classNameBody?: string;
  open: boolean;
  showCloseButton?: boolean;
  closeByBackdrop?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function BaseModal({
  title,
  children,
  footer,
  className,
  classNameBody,
  open,
  closeByBackdrop = true,
  onOpenChange,
  showCloseButton = false,
}: BaseModalProps) {
  useRemoveScrollLock();
  const handleInteractOutside = React.useCallback(
    (event: Event) => {
      if (!closeByBackdrop) {
        event.preventDefault();
      } else {
        onOpenChange?.(false);
      }
    },
    [closeByBackdrop, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className={cn(
          'sm:max-w-xl sm:p-10 p-6 bg-white rounded-xl shadow-xl flex flex-col justify-start items-center sm:min-w-[550px] max-w-[300px]',
          className,
          'overflow-y-hidden',
        )}
        showCloseButton={showCloseButton}
        onInteractOutside={handleInteractOutside}
      >
        <DialogHeader className="border-gray-200 w-full">
          <div className="flex items-center justify-between">
            {typeof title === 'string' ? (
              <DialogTitle className="sm:text-2xl text-lg font-semibold text-label-input">
                {title}
              </DialogTitle>
            ) : (
              <DialogTitle className="w-full">{title}</DialogTitle>
            )}
          </div>
        </DialogHeader>

        <div
          className={cn(
            'w-full overflow-y-auto max-h-[50vh] sm:py-5 sm:pe-3 py-3 pe-1',
            classNameBody,
          )}
        >
          {children}
        </div>

        {footer && (
          <DialogFooter className="border-gray-200 flex justify-end gap-2 w-full">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
