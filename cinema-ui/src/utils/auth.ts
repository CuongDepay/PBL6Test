const TokenKey = import.meta.env.VITE_TOKEN_KEY;

const tokenStorage = useStorage<null | string>(TokenKey, null);

export const getToken = () => tokenStorage.value;

export const setToken = (token: string) => (tokenStorage.value = token);

export const removeToken = () => (tokenStorage.value = null);
