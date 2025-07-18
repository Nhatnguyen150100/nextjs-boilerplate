import ActiveCodePage from '@/modules/auth/containers/active-code/ActiveCodePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kích hoạt tài khoản - HVL',
  description: 'Kích hoạt tài khoản HVL để sử dụng',
  keywords: ['đăng ký', 'sign up', 'tạo tài khoản', 'HVL'],
  openGraph: {
    title: 'Đăng ký - HVL',
    description: 'Tạo tài khoản HVL để trải nghiệm các dịch vụ tốt nhất.',
    siteName: 'HVL',
    type: 'website',
  },
};

export default function page() {
  return <ActiveCodePage />;
}
