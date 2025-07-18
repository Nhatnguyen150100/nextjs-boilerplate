import SignUpPage from '@/modules/auth/containers/sign-up/SignUpPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng ký - HVL',
  description: 'Tạo tài khoản HVL để trải nghiệm các dịch vụ tốt nhất.',
  keywords: ['đăng ký', 'sign up', 'tạo tài khoản', 'HVL'],
  openGraph: {
    title: 'Đăng ký - HVL',
    description: 'Tạo tài khoản HVL để trải nghiệm các dịch vụ tốt nhất.',
    siteName: 'HVL',
    type: 'website',
  },
};

export default function page() {
  return <SignUpPage />;
}
