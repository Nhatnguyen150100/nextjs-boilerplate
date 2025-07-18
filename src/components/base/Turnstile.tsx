'use client';

import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type TurnstileProps = {
  onSuccess: (token: string) => void;
  onWidgetId?: (widgetId: string) => void;
};

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
const nodeEnv = process.env.NEXT_PUBLIC_NODE_ENV || 'development';

export default function Turnstile({ onSuccess, onWidgetId }: TurnstileProps) {
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!siteKey) {
    console.error('Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY');
    return null;
  }

  if (nodeEnv !== 'production') {
    console.warn('Cloudflare Turnstile is only available in production.');
    return null;
  }

  useEffect(() => {
    if (!loaded || !widgetRef.current || !window.turnstile) return;

    const widgetId = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      callback: (token: string) => {
        setIsVerifying(false);
        onSuccess(token);
      },
      'error-callback': () => {
        setIsVerifying(false);
      },
      'expired-callback': () => {
        setIsVerifying(true);
      },
    });

    setIsVerifying(true);
    if (onWidgetId) onWidgetId(widgetId);
  }, [loaded]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />

      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image src="" alt="Logo" className="h-14 w-auto mb-6" />
            </motion.div>

            <motion.h2
              className="text-2xl font-bold text-center text-gray-800 mb-3"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Xác thực bảo mật
            </motion.h2>

            <motion.p
              className="text-gray-600 text-center mb-6"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Chúng tôi đang xác minh bạn là con người. Quá trình này sẽ mất vài
              giây.
            </motion.p>

            <div className="w-full flex justify-center mb-6">
              <div ref={widgetRef} className="cf-turnstile" />
            </div>

            {isVerifying && (
              <motion.div
                className="flex items-center justify-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Loader2 className="h-5 w-5 text-primary animate-spin mr-2" />
                <span className="text-gray-500 text-sm">Đang xác thực...</span>
              </motion.div>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-blue-700 text-sm text-center">
              Đây là bước quan trọng giúp chúng tôi bảo vệ hệ thống khỏi các
              hoạt động tự động.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
