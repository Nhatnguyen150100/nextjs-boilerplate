import { cn } from '@/lib';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const SuccessIcon = () => <CheckCircle className="w-4 h-4 text-green-500" />;
const InfoIcon = () => <Info className="w-4 h-4 text-blue-500" />;
const WarningIcon = () => <AlertCircle className="w-4 h-4 text-amber-500" />;
const ErrorIcon = () => <XCircle className="w-4 h-4 text-red-500" />;

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Props {
  message: string;
  type: ToastType;
  className?: string;
}

export const Toast = ({ message, type, className }: Props) => {
  const containerVariants = {
    success: 'bg-success-light',
    warning: 'bg-warning-light',
    error: 'bg-error-light',
    info: 'bg-info-light',
  };

  const messageVariants = {
    success: 'text-success-dark',
    warning: 'text-warning-dark',
    error: 'text-error-dark',
    info: 'text-info-dark',
  };

  const iconVariants = {
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
    info: <InfoIcon />,
  };

  return (
    <div
      className={cn(
        'max-w-sm min-w-[360px]',
        'px-3 py-2 rounded-lg flex items-center justify-start gap-2 shadow-md',
        containerVariants[type],
        className,
      )}
    >
      <span className="px-2">{iconVariants[type]}</span>
      <p
        className={cn('text-sm leading-5.5', messageVariants[type], className)}
      >
        {message}
      </p>
    </div>
  );
};
