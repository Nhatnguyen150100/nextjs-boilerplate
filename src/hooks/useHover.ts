'use client';
import React from 'react';

type UseHoverResult<T extends HTMLElement> = {
  ref: React.RefObject<T | null>;
  isHovered: boolean;
};

export function useHover<
  T extends HTMLElement = HTMLElement,
>(): UseHoverResult<T> {
  const [isHovered, setIsHovered] = React.useState(false);
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref.current]);

  return { ref, isHovered };
}
