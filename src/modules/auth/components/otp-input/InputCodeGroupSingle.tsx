'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { FieldError } from 'react-hook-form';

const OTP_LENGTH = 6;
const HIDE_TIMEOUT = 800;

type CharState = {
  value: string;
  isHidden: boolean;
};

type Props = {
  error?: FieldError;
  value: string;
  onChange: (val: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

export default function InputCodeGroupSingle({
  value,
  onChange,
  error,
  ...props
}: Props) {
  const [chars, setChars] = useState<CharState[]>(
    Array.from({ length: OTP_LENGTH }, (_, i) => ({
      value: value[i] || '',
      isHidden: true,
    })),
  );
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<(ReturnType<typeof setTimeout> | null)[]>(
    Array(OTP_LENGTH).fill(null),
  );
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }

    setChars((prev) => {
      return Array.from({ length: OTP_LENGTH }, (_, i) => {
        const char = value[i] || '';
        const existing = prev[i]?.value === char ? prev[i] : null;
        return {
          value: char,
          isHidden: existing?.isHidden ?? true,
        };
      });
    });

    if (inputRef.current) {
      const len = value.length;
      setCursorPosition(len < OTP_LENGTH ? len : OTP_LENGTH - 1);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => t && clearTimeout(t));
    };
  }, []);

  const updateCursor = () => {
    if (inputRef.current) {
      const position = inputRef.current.selectionStart || 0;
      setCursorPosition(position);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH);

    const newChars = [...chars];
    let cursorPos = 0;

    for (let i = 0; i < OTP_LENGTH; i++) {
      if (i < raw.length) {
        newChars[i] = {
          value: raw[i],
          isHidden: false,
        };

        if (timers.current[i]) clearTimeout(timers.current[i]!);
        timers.current[i] = setTimeout(() => {
          setChars((prev) => {
            const updated = [...prev];
            if (i < updated.length && updated[i].value === raw[i]) {
              updated[i] = { ...updated[i], isHidden: true };
            }
            return updated;
          });
        }, HIDE_TIMEOUT);

        cursorPos = i + 1;
      } else {
        newChars[i] = { value: '', isHidden: true };
      }
    }

    setChars(newChars);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(cursorPos, cursorPos);
        updateCursor();
      }
    }, 0);

    isInternalChange.current = true;
    onChange(raw);
  };

  const handleBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (inputRef.current) {
      inputRef.current.focus();

      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;

      const totalWidth = rect.width;
      const boxWidth = totalWidth / OTP_LENGTH;

      let index = Math.floor(x / boxWidth);
      if (index < 0) index = 0;
      if (index >= OTP_LENGTH) index = OTP_LENGTH - 1;

      const maxPosition = Math.min(
        chars.filter((c) => c.value).length,
        OTP_LENGTH,
      );
      const cursorPos = Math.max(index, maxPosition - 1);

      inputRef.current.setSelectionRange(cursorPos, cursorPos);
      setCursorPosition(cursorPos);
      setIsFocused(true);
    }
  };

  return (
    <div
      className="relative w-full flex justify-center sm:min-h-[38px] min-h-[32px] items-center"
      onClick={handleBoxClick}
    >
      <input
        {...props}
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
        value={chars.map((c) => c.value).join('')}
        onChange={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyUp={updateCursor}
        onClick={updateCursor}
      />
      <div className="flex flex-col items-start sm:gap-2 gap-1">
        <div className="flex flex-row">
          {chars.map((char, i) => (
            <div
              key={i}
              className={cn(
                'w-10 h-10 border-b text-center text-label-footer-auth font-bold flex items-center justify-center relative',
                char.isHidden
                  ? 'sm:text-5xl text-4xl pb-5'
                  : 'sm:text-3xl text-2xl',
                'select-none',
              )}
            >
              {char.value ? (char.isHidden ? '•' : char.value) : ''}

              {isFocused && cursorPosition === i && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0.5 h-8 bg-label-footer-auth animate-blink" />
                </div>
              )}
            </div>
          ))}
        </div>
        {error && <span className="text-primary text-xs">{error.message}</span>}
      </div>
    </div>
  );
}
