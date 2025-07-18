import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

export function getErrorMessage(error: any): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'Không thể kết nối đến máy chủ.';

    const status = error.response.status;
    const data = error.response.data;

    if (status === StatusCodes.BAD_REQUEST && typeof data.message === 'string')
      return data.message;
    if (status === StatusCodes.UNAUTHORIZED) return 'Bạn chưa đăng nhập.';
    if (status === StatusCodes.FORBIDDEN) return 'Bạn không có quyền truy cập.';
    if (status === StatusCodes.CONFLICT)
      return 'Tài khoản hoặc email đã tồn tại.';
    if (status === StatusCodes.NOT_FOUND)
      return 'Không tìm thấy dữ liệu yêu cầu.';
    if (status === StatusCodes.SERVICE_UNAVAILABLE)
      return 'Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.';
    if (status === StatusCodes.GATEWAY_TIMEOUT)
      return 'Máy chủ đang quá tải hoặc không phản hồi. Vui lòng thử lại sau.';
    if (status >= StatusCodes.INTERNAL_SERVER_ERROR)
      return 'Lỗi hệ thống. Vui lòng thử lại sau.';
  }

  return 'Đã có lỗi xảy ra. Vui lòng thử lại.';
}
