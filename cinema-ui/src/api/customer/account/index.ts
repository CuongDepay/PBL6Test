import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CustomerVO, CustomerForm, CustomerQuery } from '@/api/customer/account/types';
import { parseStrEmpty } from '@/utils/starcinema';

/**
 * Query Cinema list
 * @param query
 * @returns {*}
 */
export const listCustomer = (query?: CustomerQuery): AxiosPromise<CustomerVO[]> => {
  return request({
    url: '/customer/account/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Cinema
 * @param id
 */
export const getCustomer = (id?: string | number): AxiosPromise<CustomerVO> => {
  return request({
    url: '/customer/account/' + parseStrEmpty(id),
    method: 'get'
  });
};

/**
 * Add Cinema
 * @param data
 */
export const addCustomer = (data: CustomerForm) => {
  return request({
    url: '/customer/account',
    method: 'post',
    data: data
  });
};

/**
 * Edit Cinema
 * @param data
 */
export const updateCustomer = (data: CustomerForm) => {
  return request({
    url: '/customer/account',
    method: 'put',
    data: data
  });
};

/**
 * Delete Cinema
 * @param id
 */
export const delCustomer = (id: string | number | Array<string | number>) => {
  return request({
    url: '/customer/account/' + id,
    method: 'delete'
  });
};
