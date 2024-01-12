import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SeatTypeVO, SeatTypeForm, SeatTypeQuery } from '@/api/portCustomer/seatTypeManagement/types';
import { parseStrEmpty } from '@/utils/starcinema';

/**
 * Query SeatType list
 * @param query
 * @returns {*}
 */
export const listSeatType = (query?: SeatTypeQuery): AxiosPromise<SeatTypeVO[]> => {
  return request({
    url: '/portCustomer/seatType/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of SeatType
 * @param id
 */
export const getSeatType = (id?: string | number): AxiosPromise<SeatTypeVO> => {
  return request({
    url: '/portCustomer/seatType/' + parseStrEmpty(id),
    method: 'get'
  });
};

/**
 * Add SeatType
 * @param data
 */
export const addSeatType = (data: SeatTypeForm) => {
  return request({
    url: '/portCustomer/seatType',
    method: 'post',
    data: data
  });
};

/**
 * Edit SeatType
 * @param data
 */
export const updateSeatType = (data: SeatTypeForm) => {
  return request({
    url: '/portCustomer/seatType',
    method: 'put',
    data: data
  });
};

/**
 * Delete SeatType
 * @param id
 */
export const delSeatType = (id: string | number | Array<string | number>) => {
  return request({
    url: '/portCustomer/seatType/' + id,
    method: 'delete'
  });
};
