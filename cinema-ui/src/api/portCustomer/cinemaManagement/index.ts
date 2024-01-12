import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CinemaVO, CinemaForm, CinemaQuery } from '@/api/portCustomer/cinemaManagement/types';
import { parseStrEmpty } from '@/utils/starcinema';

/**
 * Query Cinema list
 * @param query
 * @returns {*}
 */
export const listCinema = (query?: CinemaQuery): AxiosPromise<CinemaVO[]> => {
  return request({
    url: '/portCustomer/cinema/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Cinema
 * @param id
 */
export const getCinema = (id?: string | number): AxiosPromise<CinemaVO> => {
  return request({
    url: '/portCustomer/cinema/' + parseStrEmpty(id),
    method: 'get'
  });
};

/**
 * Add Cinema
 * @param data
 */
export const addCinema = (data: CinemaForm) => {
  return request({
    url: '/portCustomer/cinema',
    method: 'post',
    data: data
  });
};

/**
 * Edit Cinema
 * @param data
 */
export const updateCinema = (data: CinemaForm) => {
  return request({
    url: '/portCustomer/cinema',
    method: 'put',
    data: data
  });
};

/**
 * Delete Cinema
 * @param id
 */
export const delCinema = (id: string | number | Array<string | number>) => {
  return request({
    url: '/portCustomer/cinema/' + id,
    method: 'delete'
  });
};
