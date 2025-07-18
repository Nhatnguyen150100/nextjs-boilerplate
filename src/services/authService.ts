import axiosRequest from '@/plugins/axiosRequest';
import { IBaseResponse, IResponseAuth } from '@/types';

class AuthService {
  private _prefix = '/auth';

  public signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IBaseResponse<IResponseAuth>> => {
    try {
      const res = await axiosRequest.post(`${this._prefix}/login`, {
        email,
        password,
      });
      return Promise.resolve(res.data);
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  public checkEmail = async ({
    phoneNumber,
    name,
    email,
  }: {
    phoneNumber: string;
    name: string;
    email: string;
  }): Promise<IBaseResponse<string>> => {
    try {
      const res = await axiosRequest.post(`${this._prefix}/check-email`, {
        phoneNumber,
        name,
        email,
      });
      return Promise.resolve(res.data);
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  public checkEmailForgotPassword = async ({
    email,
  }: {
    email: string;
  }): Promise<IBaseResponse<string>> => {
    try {
      const res = await axiosRequest.post(
        `${this._prefix}/check-email-forgot-password`,
        {
          email,
        },
      );
      return Promise.resolve(res.data);
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  public async signOut(): Promise<IBaseResponse<any>> {
    try {
      const res = await axiosRequest.post(`${this._prefix}/signout`);
      return Promise.resolve(res.data);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  public async verifyEmail({
    email,
    verifyCode,
  }: {
    email: string;
    verifyCode: string;
  }): Promise<IBaseResponse<string>> {
    try {
      const res = await axiosRequest.post(`${this._prefix}/verify-email`, {
        email,
        verifyCode,
      });
      return Promise.resolve(res.data);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  public async resendCode({
    email,
  }: {
    email: string;
  }): Promise<IBaseResponse<any>> {
    try {
      const res = await axiosRequest.post(`${this._prefix}/resend-email`, {
        email,
      });
      return Promise.resolve(res.data);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  public async createPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IBaseResponse<any>> {
    try {
      const res = await axiosRequest.post(`${this._prefix}/register`, {
        email,
        password,
      });
      return Promise.resolve(res.data);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}

export const authService = new AuthService();
