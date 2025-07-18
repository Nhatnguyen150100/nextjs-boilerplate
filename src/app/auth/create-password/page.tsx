import CreatePasswordPage from '@/modules/auth/containers/sign-up/CreatePasswordPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tạo mật khẩu - HVL',
  description: 'Tạo mật khẩu cho tài khoản HVL của bạn.',
  keywords: ['đăng ký', 'sign up', 'tạo tài khoản', 'HVL'],
  openGraph: {
    title: 'Đăng ký - HVL',
    description: 'Tạo tài khoản HVL để trải nghiệm các dịch vụ tốt nhất.',
    siteName: 'HVL',
    type: 'website',
  },
};

export default function page() {
  return <CreatePasswordPage />;
}
