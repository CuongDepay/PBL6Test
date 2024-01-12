import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SlideVO, SlideForm, SlideQuery } from '@/api/portCustomer/slideManagement/types';
import { parseStrEmpty } from '@/utils/starcinema';

/**
 * Query Slide list
 * @param query
 * @returns {*}
 */
export const listSlide = (query?: SlideQuery): AxiosPromise<SlideVO[]> => {
  return request({
    url: '/portCustomer/slide/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Slide
 * @param id
 */
export const getSlide = (id?: string | number): AxiosPromise<SlideVO> => {
  return request({
    url: '/portCustomer/slide/' + parseStrEmpty(id),
    method: 'get'
  });
};

/**
 * Add Slide
 * @param data
 */
export const addSlide = (data: SlideForm) => {
  return request({
    url: '/portCustomer/slide',
    method: 'post',
    data: data
  });
};

/**
 * Edit Cinema
 * @param data
 */
export const updateSlide = (data: SlideForm) => {
  return request({
    url: '/portCustomer/slide',
    method: 'put',
    data: data
  });
};

/**
 * Delete Slide
 * @param id
 */
export const delSlide = (id: string | number | Array<string | number>) => {
  return request({
    url: '/portCustomer/slide/' + id,
    method: 'delete'
  });
};
