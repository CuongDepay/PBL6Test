import request from '@/utils/request';
import { TenantPkgForm, TenantPkgQuery, TenantPkgVO } from './types';
import { AxiosPromise } from 'axios';

// Query the list of tenant packages
export function listTenantPackage(query?: TenantPkgQuery): AxiosPromise<TenantPkgVO[]> {
  return request({
    url: '/system/tenant/package/list',
    method: 'get',
    params: query
  });
}

// Query the drop-down list of tenant packages
export function selectTenantPackage(): AxiosPromise<TenantPkgVO[]> {
  return request({
    url: '/system/tenant/package/selectList',
    method: 'get'
  });
}

// Query tenant package details
export function getTenantPackage(packageId: string | number): AxiosPromise<TenantPkgVO> {
  return request({
    url: '/system/tenant/package/' + packageId,
    method: 'get'
  });
}

// New Tenant Package
export function addTenantPackage(data: TenantPkgForm) {
  return request({
    url: '/system/tenant/package',
    method: 'post',
    data: data
  });
}

// Modify Tenant Package
export function updateTenantPackage(data: TenantPkgForm) {
  return request({
    url: '/system/tenant/package',
    method: 'put',
    data: data
  });
}

// Tenant Package Status Modification
export function changePackageStatus(packageId: number | string, status: string) {
  const data = {
    packageId,
    status
  };
  return request({
    url: '/system/tenant/package/changeStatus',
    method: 'put',
    data: data
  });
}

// Delete Tenant Package
export function delTenantPackage(packageId: string | number | Array<string | number>) {
  return request({
    url: '/system/tenant/package/' + packageId,
    method: 'delete'
  });
}
