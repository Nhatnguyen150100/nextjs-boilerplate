'use client';

import useRemoveScrollLock from '@/hooks/useRemoveScrollLock';
import { cn } from '@/lib/utils';
import * as DrawerPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import Visibility from './visibility';

interface BaseDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
}

export default function BaseDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  side = 'right',
}: BaseDrawerProps) {
  useRemoveScrollLock();
  const getSlideDirection = () => {
    switch (side) {
      case 'left':
        return 'slide-in-from-left slide-out-to-left';
      case 'right':
        return 'slide-in-from-right slide-out-to-right';
      case 'top':
        return 'slide-in-from-top slide-out-to-top';
      case 'bottom':
        return 'slide-in-from-bottom slide-out-to-bottom';
      default:
        return 'slide-in-from-right slide-out-to-right';
    }
  };

  return (
    <DrawerPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=open]:fade-in',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out',
          )}
        />
        <DrawerPrimitive.Content
          className={cn(
            'fixed z-50 bg-white dark:bg-neutral-900 shadow-xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'duration-300 ease-in-out',
            getSlideDirection(),
            side === 'right' && 'right-0 top-0 h-full w-[90vw] max-w-md',
            side === 'left' && 'left-0 top-0 h-full w-[90vw] max-w-md',
            side === 'bottom' && 'bottom-0 left-0 w-full max-h-[90vh]',
            side === 'top' && 'top-0 left-0 w-full max-h-[90vh]',
          )}
        >
          <DrawerPrimitive.Title className="text-lg font-semibold">
            <div className="flex items-center justify-between px-3 h-16 border-b border-border">
              <Visibility visibility={title} boundaryComponent>
                {title}
              </Visibility>
              <DrawerPrimitive.Close asChild>
                <button className="p-2 rounded hover:bg-muted">
                  <X className="w-5 h-5" />
                </button>
              </DrawerPrimitive.Close>
            </div>
          </DrawerPrimitive.Title>
          {description && (
            <DrawerPrimitive.Description className="text-sm text-muted-foreground px-4 pt-2">
              {description}
            </DrawerPrimitive.Description>
          )}

          <div className="p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
            {children}
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
