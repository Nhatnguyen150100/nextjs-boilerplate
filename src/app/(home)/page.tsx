import HomePage from '@/modules/app/home/containers/HomePage';

export const metadata = {
  title: 'Trang chủ',
  description: 'Trang chủ của ứng dụng',
  keywords: ['home', 'trang chủ', 'HVL'],
  robots: 'index, follow',
  openGraph: {
    title: 'Trang chủ',
    description: 'Chào mừng bạn đến với trang chủ của ứng dụng HVL',
    siteName: 'HVL',
    type: 'website',
  },
};

export default function Home() {
  return <HomePage />;
}
