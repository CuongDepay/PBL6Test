import request from '@/utils/request';
import { ConfigForm, ConfigQuery, ConfigVO } from './types';
import { AxiosPromise } from 'axios';

// list of query parameters
export function listConfig(query: ConfigQuery): AxiosPromise<ConfigVO[]> {
  return request({
    url: '/system/config/list',
    method: 'get',
    params: query
  });
}

// Query parameter details
export function getConfig(configId: string | number): AxiosPromise<ConfigVO> {
  return request({
    url: '/system/config/' + configId,
    method: 'get'
  });
}

// Query the parameter value according to the parameter key name
export function getConfigKey(configKey: string): AxiosPromise<ConfigVO> {
  return request({
    url: '/system/config/configKey/' + configKey,
    method: 'get'
  });
}

// New parameter configuration
export function addConfig(data: ConfigForm) {
  return request({
    url: '/system/config',
    method: 'post',
    data: data
  });
}

// Modify parameter configuration
export function updateConfig(data: ConfigForm) {
  return request({
    url: '/system/config',
    method: 'put',
    data: data
  });
}

// Modify parameter configuration
export function updateConfigByKey(key: string, value: any) {
  return request({
    url: '/system/config/updateByKey',
    method: 'put',
    data: {
      configKey: key,
      configValue: value
    }
  });
}

// Delete parameter configuration
export function delConfig(configId: string | number | Array<string | number>) {
  return request({
    url: '/system/config/' + configId,
    method: 'delete'
  });
}

// Refresh parameter cache
export function refreshCache() {
  return request({
    url: '/system/config/refreshCache',
    method: 'delete'
  });
}
