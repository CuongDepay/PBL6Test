import { to } from 'await-to-js';
import defAva from '@/assets/images/profile.jpg';
import store from '@/store';
import { getToken, removeToken, setToken } from '@/utils/auth';
import { login as loginApi, logout as logoutApi, register as registerApi, getInfo as getUserInfo } from '@/api/customerLogin';
import { LoginData } from '@/api/types';

export const useCustomerUserStore = defineStore('customer-user', () => {
  const token = ref(getToken());
  const name = ref('');
  const nickname = ref('');
  const userId = ref<string | number>('');
  const avatar = ref('');

  /**
   * Log in
   * @param userInfo
   * @returns
   */
  const login = async (userInfo: LoginData): Promise<void> => {
    const [err, res] = await to(loginApi(userInfo));
    if (res) {
      const data = res.data;
      setToken(data.token);
      token.value = data.token;
      return Promise.resolve();
    }
    return Promise.reject(err);
  };

    /**
   * Log in
   * @param userInfo
   * @returns
   */
    const register = async (userInfo: any): Promise<void> => {
      const [err, res] = await to(registerApi(userInfo));
      if (res) {
        const data = res.data;
        return Promise.resolve();
      }
      return Promise.reject(err);
    };

  // Get user information
  const getInfo = async (): Promise<void> => {
    const [err, res] = await to(getUserInfo());
    if (res) {
      const data = res.data;
      const user = data.user;
      const profile = user.avatar == '' || user.avatar == null ? defAva : user.avatar;
      name.value = user.userName;
      nickname.value = user.nickName;
      avatar.value = profile;
      userId.value = user.userId;
      return Promise.resolve();
    }
    return Promise.reject(err);
  };

  // log out
  const logout = async (): Promise<void> => {
    await logoutApi();
    token.value = '';
    removeToken();
  };

  return {
    userId,
    token,
    nickname,
    avatar,
    login,
    register,
    getInfo,
    logout
  };
});

export default useCustomerUserStore;
// non-setup
export function useCustomerUserStoreHook() {
  return useCustomerUserStore(store);
}
