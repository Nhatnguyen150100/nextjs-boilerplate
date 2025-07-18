'use client';

import ErrorPage from '@/components/views/ErrorPage.tsx';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPage
      code={500}
      title="Đã xảy ra lỗi"
      message={
        error.message || 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.'
      }
      reset={reset}
    />
  );
}
