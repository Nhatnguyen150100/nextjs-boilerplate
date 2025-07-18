import SignInPage from '@/modules/auth/containers/sign-in/SignInPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập - HVL',
  description: 'Trang đăng nhập tài khoản người dùng HVL',
  keywords: ['đăng nhập', 'login', 'tài khoản', 'HVL'],
  robots: 'index, follow',
  openGraph: {
    title: 'Đăng nhập - HVL',
    description: 'Truy cập tài khoản HVL để sử dụng đầy đủ tính năng',
    siteName: 'HVL',
    type: 'website',
  },
};

export default function page() {
  return <SignInPage />;
}
