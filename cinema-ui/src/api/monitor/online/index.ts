import request from '@/utils/request';
import { OnlineQuery, OnlineVO } from './types';
import { AxiosPromise } from 'axios';

// Query the list of online users
export function list(query: OnlineQuery): AxiosPromise<OnlineVO[]> {
  return request({
    url: '/monitor/online/list',
    method: 'get',
    params: query
  });
}

// Forcibly quit users
export function forceLogout(tokenId: string) {
  return request({
    url: '/monitor/online/' + tokenId,
    method: 'delete'
  });
}
