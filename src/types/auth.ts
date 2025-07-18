import { IUser } from './user';

export interface IResponseAuth extends IUser {
  accessToken: string;
}
