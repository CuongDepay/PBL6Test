import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DictDataForm, DictDataQuery, DictDataVO } from './types';
// Query dictionary data information according to dictionary type
export function getDicts(dictType: string): AxiosPromise<DictDataVO[]> {
  return request({
    url: '/system/dict/data/type/' + dictType,
    method: 'get'
  });
}

// Query dictionary data list
export function listData(query: DictDataQuery): AxiosPromise<DictDataVO[]> {
  return request({
    url: '/system/dict/data/list',
    method: 'get',
    params: query
  });
}

// Query dictionary data details
export function getData(dictCode: string | number): AxiosPromise<DictDataVO> {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'get'
  });
}

// Add dictionary data
export function addData(data: DictDataForm) {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data: data
  });
}

// Modify dictionary data
export function updateData(data: DictDataForm) {
  return request({
    url: '/system/dict/data',
    method: 'put',
    data: data
  });
}

// Delete dictionary data
export function delData(dictCode: string | number | Array<string | number>) {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'delete'
  });
}
