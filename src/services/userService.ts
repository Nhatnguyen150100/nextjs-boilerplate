import axiosRequest from '@/plugins/axiosRequest';
import { IBaseResponse, IBaseResponsePage, IUser } from '@/types';
import { IQuery } from '@/types/query';
import onRemoveParams from '@/utils/functions/on-remove-params';

class UserService {
  private _prefix = '/user';

  public getUserInfo = async (id: string): Promise<IBaseResponse<IUser>> => {
    const res = await axiosRequest.get(`${this._prefix}/${id}`);
    return res.data;
  };

  public updateUserInfo = async (
    data: Partial<IUser>,
  ): Promise<IBaseResponse<IUser>> => {
    const res = await axiosRequest.put(`${this._prefix}/update`, data);
    return res.data;
  };

  public getListUser = async (
    query: IQuery,
  ): Promise<IBaseResponse<IBaseResponsePage<IUser[]>>> => {
    const res = await axiosRequest.get(`${this._prefix}/search`, {
      params: onRemoveParams(query),
    });
    return res.data;
  };
}

export const userService = new UserService();
