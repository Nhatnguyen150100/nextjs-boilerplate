import { Button } from '@/components/ui/button';
import { cn } from '@/lib';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BasePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function BasePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: BasePaginationProps) {
  return (
    <div className={`flex items-center justify-end gap-2 mt-4 ${className}`}>
      <Button
        className={cn(
          'rounded-full h-6 w-6',
          currentPage === 1 && 'bg-gray-100 cursor-not-allowed',
        )}
        variant={currentPage === 1 ? 'outline' : 'default'}
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="text-sm">
        Trang {currentPage} / {totalPages}
      </span>
      <Button
        className={cn(
          'rounded-full h-6 w-6',
          currentPage === totalPages && 'bg-gray-100 cursor-not-allowed',
        )}
        variant={currentPage === totalPages ? 'outline' : 'default'}
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
