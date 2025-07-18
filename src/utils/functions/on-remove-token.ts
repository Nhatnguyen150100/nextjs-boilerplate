import { DEFINE_KEY_TOKEN } from '@/constants';
import { cookiesStore } from '@/plugins/axiosRequest';

const onRemoveAllToken = () => {
  cookiesStore.remove(DEFINE_KEY_TOKEN.accessToken);
  cookiesStore.remove(DEFINE_KEY_TOKEN.refreshToken);
  cookiesStore.remove(DEFINE_KEY_TOKEN.expireTime);
};

export default onRemoveAllToken;
