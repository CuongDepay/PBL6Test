import request from '@/utils/request';
import { OperLogQuery, OperLogVO } from './types';
import { AxiosPromise } from 'axios';

// Query the operation log list
export function list(query: OperLogQuery): AxiosPromise<OperLogVO[]> {
  return request({
    url: '/monitor/operlog/list',
    method: 'get',
    params: query
  });
}

// delete operation log
export function delOperlog(operId: string | number | Array<string | number>) {
  return request({
    url: '/monitor/operlog/' + operId,
    method: 'delete'
  });
}

// clear operation log
export function cleanOperlog() {
  return request({
    url: '/monitor/operlog/clean',
    method: 'delete'
  });
}
