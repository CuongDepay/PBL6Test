import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ShowtimeVO, ShowtimeForm, ShowtimeQuery } from '@/api/portCustomer/showtimeManagement/types';
import { parseStrEmpty } from '@/utils/starcinema';

/**
 * Query Showtime list
 * @param query
 * @returns {*}
 */
export const listShowtime = (query?: ShowtimeQuery): AxiosPromise<ShowtimeVO[]> => {
  return request({
    url: '/portCustomer/showtimeManagement/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Showtime
 * @param id
 */
export const getShowtime = (id?: string | number): AxiosPromise<ShowtimeVO> => {
  return request({
    url: '/portCustomer/showtimeManagement/' + parseStrEmpty(id),
    method: 'get'
  });
};

/**
 * Add Showtime
 * @param data
 */
export const addShowtime = (data: ShowtimeForm) => {
  return request({
    url: '/portCustomer/showtimeManagement',
    method: 'post',
    data: data
  });
};

/**
 * Edit Showtime
 * @param data
 */
export const updateShowtime = (data: ShowtimeForm) => {
  return request({
    url: '/portCustomer/showtimeManagement',
    method: 'put',
    data: data
  });
};

/**
 * Delete Showtime
 * @param id
 */
export const delShowtime = (id: string | number | Array<string | number>) => {
  return request({
    url: '/portCustomer/showtimeManagement/' + id,
    method: 'delete'
  });
};

// Release edo
export const releaseShowtime = (showtimes: Array<ShowtimeForm>) => {
  return request({
    url: '/portCustomer/showtimeManagement/release',
    method: 'post',
    data: showtimes
  });
};
