'use client';
import { Button } from '@/components/ui/button';
import { DEFINE_ALL_ROUTERS } from '@/constants';
import { WifiOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NoInternetPage() {
  const router = useRouter();

  useEffect(() => {
    const handleOnline = () => {
      router.push(DEFINE_ALL_ROUTERS.HOME);
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mb-6 text-destructive">
        <WifiOff className="h-24 w-24 mx-auto" />
      </div>

      <h1 className="text-3xl font-semibold tracking-tight mb-2">
        Không có kết nối Internet
      </h1>

      <p className="text-muted-foreground max-w-md mb-8">
        Thiết bị của bạn đang không có kết nối mạng. Vui lòng kiểm tra lại kết
        nối và thử lại.
      </p>

      <Button onClick={() => window.location.reload()} className="px-6 py-3">
        Thử lại
      </Button>
    </div>
  );
}
