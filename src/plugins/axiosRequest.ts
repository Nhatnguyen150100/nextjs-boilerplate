import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { DEFINE_KEY_TOKEN } from '@/constants/key-store';
export const cookiesStore = Cookies;

let isRefreshing = false;
let pendingRequests: Array<any> = [];

const API_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
const API_PREFIX = '/api';

const axiosRequest = axios.create({
  baseURL: API_URL + API_PREFIX,
  withCredentials: false,
});

const buildBearerToken = (token: string) => {
  return `Bearer ${token}`;
};

const onRemoveAllToken = () => {
  cookiesStore.remove(DEFINE_KEY_TOKEN.accessToken);
  cookiesStore.remove(DEFINE_KEY_TOKEN.refreshToken);
  cookiesStore.remove(DEFINE_KEY_TOKEN.expireTime);
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

    if (response.status === 401 || response.status === 404) {
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
  if (error.code === 'ERR_NETWORK') {
    if (window.location.pathname !== '/no-internet')
      window.location.replace('/no-internet');
    return Promise.reject(error);
  }
  const { data, status } = error.response;

  if (status === 401) {
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
          return await Promise.reject(error);
        }

        const { newAccessToken, newRefreshToken } = response;
        cookiesStore.set(DEFINE_KEY_TOKEN.accessToken, newAccessToken);
        cookiesStore.set(DEFINE_KEY_TOKEN.refreshToken, newRefreshToken);
        axiosRequest.defaults.headers.common['Authorization'] =
          buildBearerToken(newAccessToken);

        pendingRequests.forEach((callback) => callback(newAccessToken));
      } catch (_error: any) {
        onRemoveAllToken();
        window.location.replace('/login');
        return await Promise.reject(_error);
      } finally {
        pendingRequests = [];
        isRefreshing = false;
      }
    }

    return retryOriginalRequest;
  }

  if (!error.response || error.response.status >= 500) {
    return Promise.reject(error);
  }

  console.log('🚀 ~ onRejectResponse ~ data:', data);

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
