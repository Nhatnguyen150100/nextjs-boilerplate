import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib';
import { IMetadata } from '@/types';
import { BasePagination } from './BasePagination';
import LoadingPage from './LoadingPage';
import Nodata from './Nodata';
import Visibility from './visibility';

export type IColumn<T> = {
  key: keyof T;
  titleHeader?: string;
  renderHeader?: React.ReactNode;
  renderCell?: (value: any, row: T, index: number) => React.ReactNode;
};

interface IProps<T> {
  data?: T[];
  columns: IColumn<T>[];
  noDataText?: string;
  className?: string;
  metadata?: IMetadata;
  onPageChange?: (page: number) => void;
  onClickRow?: (row: T) => void;
  isLoading?: boolean;
}

export function BaseTable<T extends { id: string }>({
  data,
  columns,
  noDataText = 'Không có dữ liệu',
  className = '',
  metadata,
  isLoading,
  onPageChange,
  onClickRow,
}: IProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full h-[350px]">
        <LoadingPage className="h-full flex justify-center items-center" />
      </div>
    );
  }

  if (!data?.length) {
    return <Nodata message={noDataText} />;
  }

  return (
    <div className={cn('w-full', className)}>
      <Table>
        <TableHeader>
          <TableRow className="text-left border-b border-gray-200">
            {columns.map((col, idx) => (
              <Visibility
                key={String(col.key)}
                visibility={col.renderHeader}
                suspenseComponent={
                  <TableHead className="py-3 px-0 text-xs font-normal text-placeholder min-w-[90px] p-[10px]">
                    {col.titleHeader}
                  </TableHead>
                }
              >
                {col.renderHeader}
              </Visibility>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="space-y-[10px]">
          {data.map((row, rowIndex) => {
            return (
              <TableRow
                key={row.id}
                onClick={() => onClickRow && onClickRow(row)}
                className={cn(
                  'hover:bg-primary-foreground hover:cursor-pointer border-none rounded-xl transition-colors',
                )}
              >
                {columns.map((col) => {
                  const value = (row as any)[col.key];
                  const key = `${String(col.key)}-${rowIndex}`;
                  return (
                    <Visibility
                      key={key}
                      visibility={col.renderCell}
                      suspenseComponent={
                        <TableCell className={'align-top p-[10px]'}>
                          <span className="text-xs font-medium text-label-input overflow-x-hidden line-clamp-1 text-ellipsis max-w-[90px]">
                            {String(value)}
                          </span>
                        </TableCell>
                      }
                    >
                      {col.renderCell
                        ? col.renderCell(value, row, rowIndex)
                        : null}
                    </Visibility>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {metadata && (
        <div className="flex justify-end">
          <BasePagination
            currentPage={metadata.page}
            totalPages={metadata.totalPage}
            onPageChange={(page: number) => {
              if (onPageChange) {
                onPageChange(page);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
