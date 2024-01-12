import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { LoginData, LoginResult } from './types';
import { UserInfo } from '@/api/system/user/types';

/**
 * @param data {LoginData}
 * @returns
 */
export function login(data: LoginData): AxiosPromise<LoginResult> {
  const params = {
    username: data.username.trim(),
    password: data.password,
    uuid: data.uuid
  };
  return request({
    url: '/auth/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: params
  });
}

// Registration method
export function register(data: any) {
  return request({
    url: '/auth/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  });
}

/**
 * log out
 */
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  });
}

// Get user details
export function getInfo(): AxiosPromise<UserInfo> {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  });
}
