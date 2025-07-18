import TheLayout from '@/components/layout/TheLayout';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TheLayout>{children}</TheLayout>;
}
