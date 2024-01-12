import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { PromotionVO, PromotionForm, PromotionQuery } from '@/api/portCustomer/promotionManagement/types';
import { parseStrEmpty } from '@/utils/starcinema';

/**
 * Query Promotion list
 * @param query
 * @returns {*}
 */
export const listPromotion = (query?: PromotionQuery): AxiosPromise<PromotionVO[]> => {
  return request({
    url: '/portCustomer/promotion/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Promotion
 * @param id
 */
export const getPromotion = (id?: string | number): AxiosPromise<PromotionVO> => {
  return request({
    url: '/portCustomer/promotion/' + parseStrEmpty(id),
    method: 'get'
  });
};

/**
 * Add Promotion
 * @param data
 */
export const addPromotion = (data: PromotionForm) => {
  return request({
    url: '/portCustomer/promotion',
    method: 'post',
    data: data
  });
};

/**
 * Edit Promotion
 * @param data
 */
export const updatePromotion = (data: PromotionForm) => {
  return request({
    url: '/portCustomer/promotion',
    method: 'put',
    data: data
  });
};

/**
 * Delete Promotion
 * @param id
 */
export const delPromotion = (id: string | number | Array<string | number>) => {
  return request({
    url: '/portCustomer/promotion/' + id,
    method: 'delete'
  });
};
