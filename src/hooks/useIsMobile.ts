'use client';
import { DEFINE_IS_MOBILE_BREAK_POINT } from '@/constants';
import { useEffect, useState } from 'react';

export function useIsMobile(
  breakpoint = DEFINE_IS_MOBILE_BREAK_POINT,
): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}
