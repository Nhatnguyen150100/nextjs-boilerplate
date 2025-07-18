import NoInternetPage from '@/components/views/NoInternetPage';
import React from 'react';

export const metadata = {
  title: 'Không có kết nối Internet',
  description: 'Trang thông báo không có kết nối Internet',
  keywords: ['không có kết nối', 'internet', 'mạng', 'HVL'],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Không có kết nối Internet',
    description: 'Vui lòng kiểm tra kết nối mạng của bạn và thử lại.',
    siteName: 'HVL',
    type: 'website',
  },
};

export default function page() {
  return <NoInternetPage />;
}
