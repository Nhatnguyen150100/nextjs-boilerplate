import React from 'react';

export default function LoadingPage({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-white"
      {...props}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="loader ease-linear rounded-full border-8 border-t-transparent border-primary h-20 w-20 animate-spin" />
        <p className="text-primary text-sm font-medium">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
}
