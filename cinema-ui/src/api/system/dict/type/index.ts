import request from '@/utils/request';
import { DictTypeForm, DictTypeVO, DictTypeQuery } from './types';
import { AxiosPromise } from 'axios';

// Query list of dictionary types
export function listType(query: DictTypeQuery): AxiosPromise<DictTypeVO[]> {
  return request({
    url: '/system/dict/type/list',
    method: 'get',
    params: query
  });
}

// Query dictionary type details
export function getType(dictId: number | string): AxiosPromise<DictTypeVO> {
  return request({
    url: '/system/dict/type/' + dictId,
    method: 'get'
  });
}

// New dictionary type
export function addType(data: DictTypeForm) {
  return request({
    url: '/system/dict/type',
    method: 'post',
    data: data
  });
}

// Modify dictionary type
export function updateType(data: DictTypeForm) {
  return request({
    url: '/system/dict/type',
    method: 'put',
    data: data
  });
}

// Delete dictionary type
export function delType(dictId: string | number | Array<string | number>) {
  return request({
    url: '/system/dict/type/' + dictId,
    method: 'delete'
  });
}

// Refresh the dictionary cache
export function refreshCache() {
  return request({
    url: '/system/dict/type/refreshCache',
    method: 'delete'
  });
}

// Get list of dictionary selection boxes
export function optionselect(): AxiosPromise<DictTypeVO[]> {
  return request({
    url: '/system/dict/type/optionselect',
    method: 'get'
  });
}
