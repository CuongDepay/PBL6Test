import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MenuQuery, MenuVO, MenuForm, MenuTreeOption, RoleMenuTree } from './types';

// Query menu list
export const listMenu = (query?: MenuQuery): AxiosPromise<MenuVO[]> => {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params: query
  });
};

// Query menu details
export const getMenu = (menuId: string | number): AxiosPromise<MenuVO> => {
  return request({
    url: '/system/menu/' + menuId,
    method: 'get'
  });
};

// Query menu drop-down tree structure
export const treeselect = (): AxiosPromise<MenuTreeOption[]> => {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  });
};

// Query the menu drop-down tree structure according to the role ID
export const roleMenuTreeselect = (roleId: string | number): AxiosPromise<RoleMenuTree> => {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  });
};

// Query the menu drop-down tree structure according to the role ID
export const tenantPackageMenuTreeselect = (packageId: string | number): AxiosPromise<RoleMenuTree> => {
  return request({
    url: '/system/menu/tenantPackageMenuTreeselect/' + packageId,
    method: 'get'
  });
};

// new menu
export const addMenu = (data: MenuForm) => {
  return request({
    url: '/system/menu',
    method: 'post',
    data: data
  });
};

// edit menu
export const updateMenu = (data: MenuForm) => {
  return request({
    url: '/system/menu',
    method: 'put',
    data: data
  });
};

// delete menu
export const delMenu = (menuId: string | number) => {
  return request({
    url: '/system/menu/' + menuId,
    method: 'delete'
  });
};
