import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { RouteRecordRaw } from 'vue-router';

// get route
export function getRouters(): AxiosPromise<RouteRecordRaw[]> {
  return request({
    url: '/system/menu/getRouters',
    method: 'get'
  });
}
