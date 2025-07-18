import Footer from '@/modules/auth/components/layouts/Footer';
import CloudflareTurnstileProvider from '@/providers/CloudflareTurnstileProvider';

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background-primary">
      <main className="flex-grow flex items-center justify-center px-4">
        <CloudflareTurnstileProvider>{children}</CloudflareTurnstileProvider>
      </main>
      <Footer />
    </div>
  );
}
