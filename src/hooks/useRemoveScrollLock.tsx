'use client';

import { useEffect } from 'react';

export default function useRemoveScrollLock() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const body = document.body;
      if (body.hasAttribute('data-scroll-locked')) {
        body.removeAttribute('data-scroll-locked');
        body.style.overflow = 'auto';
        body.style.marginRight = '0';
      }
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);
}
