import ForgotPasswordPage from '@/modules/auth/containers/forgot-password/ForgotPasswordPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quên mật khẩu - HVL',
  description: 'Quên mật khẩu tài khoản HVL.',
  keywords: ['đăng ký', 'sign up', 'tạo tài khoản', 'HVL'],
  openGraph: {
    title: 'Quên mật khẩu - HVL',
    description: 'Quên mật khẩu tài khoản HVL.',
    url: 'https://hvl.com/auth/sign-up',
    siteName: 'HVL',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function page() {
  return <ForgotPasswordPage />;
}
