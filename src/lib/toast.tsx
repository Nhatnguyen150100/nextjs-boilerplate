import { Toast } from '@/components/base/Toast';
import { toast } from 'sonner';

export const showToast = {
  success: (message: string) =>
    toast.custom(() => <Toast message={message} type="success" />),

  error: (message: string) =>
    toast.custom(() => <Toast message={message} type="error" />),

  warning: (message: string) =>
    toast.custom(() => <Toast message={message} type="warning" />),

  info: (message: string) =>
    toast.custom(() => <Toast message={message} type="info" />),
};
