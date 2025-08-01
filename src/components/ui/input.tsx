import { cn } from '@/lib/utils';
import * as React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  rightSection?: React.ReactNode;
}

function Input({ className, type, rightSection, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        autoFocus={false}
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 pr-10 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      {rightSection && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {rightSection}
        </div>
      )}
    </div>
  );
}

export { Input };
