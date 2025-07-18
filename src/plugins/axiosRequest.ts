import { DEFINE_ALL_ROUTERS, DEFINE_KEY_TOKEN } from '@/constants';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
export const cookiesStore = Cookies;
import { showToast } from '@/lib';
import onRemoveAllToken from '@/utils/functions/on-remove-token';
import { getErrorMessage } from '@/utils/helpers/getErrorMessage';
import { StatusCodes } from 'http-status-codes';
import { signOut } from 'next-auth/react';

let isRefreshing = false;
let pendingRequests: Array<any> = [];

const API_URL: string = process.env.NEXT_PUBLIC_BASE_URL ?? '';
const API_PREFIX: string = process.env.NEXT_PUBLIC_API_PREFIX ?? '';

const axiosRequest = axios.create({
  baseURL: API_URL + API_PREFIX,
  withCredentials: false,
});

const buildBearerToken = (token: string) => {
  return `Bearer ${token}`;
};

axiosRequest.defaults.headers.put['Content-Type'] = 'application/json';

const getNewAccessToken = async () => {
  try {
    const refreshToken = cookiesStore.get(DEFINE_KEY_TOKEN.refreshToken);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${API_URL}/auth/refresh_token`, {
      refresh_token: refreshToken,
    });

    if (
      response.status === StatusCodes.UNAUTHORIZED ||
      response.status === StatusCodes.NOT_FOUND
    ) {
      throw new Error('No refresh token available');
    }

    const { access_token, refresh_token } = response.data;

    return { newAccessToken: access_token, newRefreshToken: refresh_token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const onFulFillResponse = (
  value: AxiosResponse<any, any>,
): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
  return value;
};

const onRejectResponse = async (error: any) => {
  const showError = () => {
    if (typeof window !== 'undefined') {
      const errorMessage = getErrorMessage(error);
      showToast.error(errorMessage);
    }
  };

  const isNetworkError = error.code === 'ERR_NETWORK';
  const status = error.response?.status;

  if (!error.response) {
    showError();
    return Promise.reject(error);
  }

  if (isNetworkError) {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== DEFINE_ALL_ROUTERS.NO_INTERNET) {
        window.location.replace(DEFINE_ALL_ROUTERS.NO_INTERNET);
      }
    }
    showError();
    return Promise.reject(error);
  }

  if (status === StatusCodes.UNAUTHORIZED) {
    const retryOriginalRequest = new Promise((resolve) => {
      pendingRequests.push((newAccessToken: string) => {
        const newConfig = {
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: buildBearerToken(newAccessToken),
          },
        };
        resolve(axiosRequest.request(newConfig));
      });
    });

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const response = await getNewAccessToken();
        if (!response) {
          onRemoveAllToken();
          signOut();
          showError();
          return Promise.reject(error);
        }

        const { newAccessToken, newRefreshToken } = response;
        cookiesStore.set(DEFINE_KEY_TOKEN.accessToken, newAccessToken);
        cookiesStore.set(DEFINE_KEY_TOKEN.refreshToken, newRefreshToken);
        axiosRequest.defaults.headers.common['Authorization'] =
          buildBearerToken(newAccessToken);

        pendingRequests.forEach((cb) => cb(newAccessToken));
      } catch (refreshError: any) {
        onRemoveAllToken();
        signOut();
        showToast.error(getErrorMessage(refreshError));
        return Promise.reject(refreshError);
      } finally {
        pendingRequests = [];
        isRefreshing = false;
      }
    }

    return retryOriginalRequest;
  }

  if (status >= StatusCodes.INTERNAL_SERVER_ERROR) {
    showError();
    return Promise.reject(error);
  }

  showError();
  return Promise.reject(error);
};

axiosRequest.interceptors.response.use(onFulFillResponse, onRejectResponse);
axiosRequest.interceptors.request.use((config) => {
  const accessToken = cookiesStore.get(DEFINE_KEY_TOKEN.accessToken);
  if (accessToken) {
    config.headers['Authorization'] = buildBearerToken(accessToken);
  }
  return config;
});

export default axiosRequest;
