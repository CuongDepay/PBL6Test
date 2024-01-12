import request from '@/utils/request';
import { OssConfigForm, OssConfigQuery, OssConfigVO } from './types';
import { AxiosPromise } from 'axios';

// Query the list of object storage configurations
export function listOssConfig(query: OssConfigQuery): AxiosPromise<OssConfigVO[]> {
  return request({
    url: '/resource/oss/config/list',
    method: 'get',
    params: query
  });
}

// Query Object Storage Configuration Details
export function getOssConfig(ossConfigId: string | number): AxiosPromise<OssConfigVO> {
  return request({
    url: '/resource/oss/config/' + ossConfigId,
    method: 'get'
  });
}

// Added object storage configuration
export function addOssConfig(data: OssConfigForm) {
  return request({
    url: '/resource/oss/config',
    method: 'post',
    data: data
  });
}

// Modify object storage configuration
export function updateOssConfig(data: OssConfigForm) {
  return request({
    url: '/resource/oss/config',
    method: 'put',
    data: data
  });
}

// Delete object storage configuration
export function delOssConfig(ossConfigId: string | number | Array<string | number>) {
  return request({
    url: '/resource/oss/config/' + ossConfigId,
    method: 'delete'
  });
}

// Object storage state modification
export function changeOssConfigStatus(ossConfigId: string | number, status: string, configKey: string) {
  const data = {
    ossConfigId,
    status,
    configKey
  };
  return request({
    url: '/resource/oss/config/changeStatus',
    method: 'put',
    data: data
  });
}
