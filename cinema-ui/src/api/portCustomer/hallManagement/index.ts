import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { HallVO, HallSeatVO, HallForm, HallSeatForm, HallQuery, HallSeatQuery } from '@/api/portCustomer/hallManagement/types';
import { parseStrEmpty } from '@/utils/starcinema';

/**
 * Query Hall list
 * @param query
 * @returns {*}
 */
export const listHall = (query?: HallQuery): AxiosPromise<HallVO[]> => {
  return request({
    url: '/portCustomer/hall/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Hall
 * @param id
 */
export const getHall = (id?: string | number): AxiosPromise<HallVO> => {
  return request({
    url: '/portCustomer/hall/' + parseStrEmpty(id),
    method: 'get'
  });
};

/**
 * Add Hall
 * @param data
 */
export const addHall = (data: HallForm) => {
  return request({
    url: '/portCustomer/hall',
    method: 'post',
    data: data
  });
};

/**
 * Edit Hall
 * @param data
 */
export const updateHall = (data: HallForm) => {
  return request({
    url: '/portCustomer/hall',
    method: 'put',
    data: data
  });
};

/**
 * Delete Hall
 * @param id
 */
export const delHall = (id: string | number | Array<string | number>) => {
  return request({
    url: '/portCustomer/hall/' + id,
    method: 'delete'
  });
};

/**
 * Query Hall list
 * @param query
 * @returns {*}
 */
export const listHallSeat = (query?: HallSeatQuery): AxiosPromise<HallSeatVO[]> => {
  return request({
    url: '/portCustomer/hallSeat/list',
    method: 'get',
    params: query
  });
};

/**
 * Edit Hall
 * @param data
 */
export const updateHallSeats = (hallSeats: HallSeatVO[], hallId: string | number) => {
  return request({
    url: '/portCustomer/hallSeat/hall/' + hallId,
    method: 'put',
    data: hallSeats
  });
};

export const getHallMap = (): AxiosPromise<any> => {
  return request({
    url: '/portCustomer/hall/map',
    method: 'get'
  });
};
