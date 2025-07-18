'use client';

import { ArrowLeft, Home, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '../ui';

type ErrorPageProps = {
  code?: number;
  title?: string;
  message?: string;
  reset?: () => void;
};

const ERROR_TYPES = {
  400: {
    icon: '🚫',
    color: 'text-orange-600',
    title: 'Yêu cầu không hợp lệ',
    message:
      'Yêu cầu của bạn không thể được xử lý. Vui lòng kiểm tra lại thông tin.',
  },
  401: {
    icon: '🔒',
    color: 'text-yellow-600',
    title: 'Không được phép truy cập',
    message: 'Bạn không có quyền truy cập tài nguyên này. Vui lòng đăng nhập.',
  },
  403: {
    icon: '⛔',
    color: 'text-amber-600',
    title: 'Truy cập bị từ chối',
    message: 'Bạn không có quyền truy cập trang này.',
  },
  404: {
    icon: '🔍',
    color: 'text-red-600',
    title: 'Không tìm thấy trang',
    message: 'Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.',
  },
  500: {
    icon: '💥',
    color: 'text-rose-600',
    title: 'Lỗi máy chủ',
    message: 'Máy chủ gặp sự cố nội bộ. Vui lòng thử lại sau.',
  },
  502: {
    icon: '🔌',
    color: 'text-violet-600',
    title: 'Lỗi cổng kết nối',
    message: 'Máy chủ đang gặp sự cố kết nối. Vui lòng thử lại sau vài phút.',
  },
  503: {
    icon: '🛠️',
    color: 'text-blue-600',
    title: 'Dịch vụ không khả dụng',
    message: 'Dịch vụ tạm thời không khả dụng do bảo trì hoặc quá tải.',
  },
  504: {
    icon: '⏳',
    color: 'text-cyan-600',
    title: 'Hết thời gian phản hồi',
    message: 'Máy chủ không phản hồi trong thời gian cho phép.',
  },
};

export default function ErrorPage({
  code = 500,
  title,
  message,
  reset,
}: ErrorPageProps) {
  const errorInfo =
    ERROR_TYPES[code as keyof typeof ERROR_TYPES] || ERROR_TYPES[500];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center">
          <div className="mb-6">
            <motion.div
              className={`text-6xl mb-3 ${errorInfo.color}`}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 0, 5, 0],
              }}
              transition={{ duration: 0.6 }}
            >
              {errorInfo.icon}
            </motion.div>
            <div className={`text-5xl font-bold ${errorInfo.color} mb-1`}>
              {code}
            </div>
            <h1 className={`text-2xl font-bold ${errorInfo.color} mb-3`}>
              {title || errorInfo.title}
            </h1>
            <p className="text-gray-600">{message || errorInfo.message}</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Button>

            <Button
              onClick={() => {
                if (reset) reset();
                window.location.reload();
              }}
              variant="default"
              className="gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Thử lại
            </Button>

            <Button asChild variant="default" className="gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                Trang chủ
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p>
              Cần hỗ trợ thêm?{' '}
              <Link
                href="/support"
                className="font-medium hover:underline text-gray-700"
              >
                Liên hệ đội ngũ hỗ trợ
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
