'use client';

import ErrorPage from '@/components/views/ErrorPage.tsx';

export default function NotFoundPage() {
  return (
    <ErrorPage
      code={404}
      title="Không tìm thấy trang"
      message="Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển."
    />
  );
}
