import axiosRequest from '@/plugins/axiosRequest';
import { IBaseResponse } from '@/types';
import qs from 'qs';

class UploadService {
  private _prefix = '/upload';

  public uploadFile = async (
    file: File | any,
  ): Promise<IBaseResponse<string>> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axiosRequest.post(this._prefix, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  };

  public removeFile = async (
    urls: string[],
  ): Promise<IBaseResponse<string>> => {
    const res = await axiosRequest.delete(this._prefix, {
      params: { urls },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    });
    return res.data;
  };
}

export const uploadService = new UploadService();
