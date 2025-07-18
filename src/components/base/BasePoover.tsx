'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useRemoveScrollLock from '@/hooks/useRemoveScrollLock';
import { cn } from '@/lib/utils';
import React, { useState, useRef } from 'react';

interface BasePopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  triggerType?: 'click' | 'hover';
  delay?: number;
}

export default function BasePopover({
  trigger,
  children,
  className,
  side = 'bottom',
  align = 'center',
  sideOffset = 8,
  triggerType = 'click',
  delay = 150,
}: BasePopoverProps) {
  useRemoveScrollLock();
  const [open, setOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const triggerProps =
    triggerType === 'hover'
      ? {
          onMouseEnter: () => {
            if (timer.current) clearTimeout(timer.current);
            setOpen(true);
          },
          onMouseLeave: () => {
            timer.current = setTimeout(() => setOpen(false), delay);
          },
        }
      : {};

  return (
    <Popover
      open={triggerType === 'hover' ? open : undefined}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <div {...triggerProps}>{trigger}</div>
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        onMouseEnter={() => {
          if (triggerType === 'hover' && timer.current)
            clearTimeout(timer.current);
        }}
        onMouseLeave={() => {
          if (triggerType === 'hover') {
            timer.current = setTimeout(() => setOpen(false), delay);
          }
        }}
        className={cn(
          'z-50 w-auto rounded-md border bg-white p-2 shadow-md animate-in fade-in slide-in-from-top-2 dark:bg-neutral-900',
          className,
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
