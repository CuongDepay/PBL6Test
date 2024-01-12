import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { LoginData, LoginResult, VerifyCodeResult, TenantInfo } from './types';
import { UserInfo } from '@/api/system/user/types';

/**
 * @param data {LoginData}
 * @returns
 */
export function login(data: LoginData): AxiosPromise<LoginResult> {
  const params = {
    tenantId: data.tenantId,
    username: data.username.trim(),
    password: data.password,
    code: data.code,
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

/**
 * get verification code
 */
export function getCodeImg(): AxiosPromise<VerifyCodeResult> {
  return request({
    url: '/code',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  });
}

// Get user details
export function getInfo(): AxiosPromise<UserInfo> {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  });
}

// Get a list of tenants
export function getTenantList(): AxiosPromise<TenantInfo> {
  return request({
    url: '/auth/tenant/list',
    headers: {
      isToken: false
    },
    method: 'get'
  });
}
