import request from '@/utils/request';
import { LoginInfoQuery, LoginInfoVO } from './types';
import { AxiosPromise } from 'axios';

// Query the list of login logs
export function list(query: LoginInfoQuery): AxiosPromise<LoginInfoVO[]> {
  return request({
    url: '/monitor/logininfor/list',
    method: 'get',
    params: query
  });
}

// delete login log
export function delLoginInfo(infoId: string | number | Array<string | number>) {
  return request({
    url: '/monitor/logininfor/' + infoId,
    method: 'delete'
  });
}

// Unlock user login status
export function unlockLoginInfo(userName: string | Array<string>) {
  return request({
    url: '/monitor/logininfor/unlock/' + userName,
    method: 'get'
  });
}

// clear login log
export function cleanLoginInfo() {
  return request({
    url: '/monitor/logininfor/clean',
    method: 'delete'
  });
}
