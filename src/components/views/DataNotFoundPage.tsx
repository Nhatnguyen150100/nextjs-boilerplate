import { Button } from '@/components/ui/button';
import { FileSearch } from 'lucide-react';
import Link from 'next/link';

const DataNotFoundPage = ({
  title = 'Không tìm thấy dữ liệu',
  message = 'Chúng tôi không thể tìm thấy thông tin bạn yêu cầu. Vui lòng kiểm tra lại hoặc thử tìm kiếm với từ khóa khác.',
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="relative flex justify-center">
          <FileSearch className="relative z-10 w-20 h-20 text-primary p-3 rounded-full bg-primary-50 border-2 border-primary-100" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            {title}
          </h1>
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>

        <div className="pt-4">
          <Button asChild variant="default">
            <Link href="/">Quay lại trang chủ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataNotFoundPage;
