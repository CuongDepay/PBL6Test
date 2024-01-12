import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SeatVO, SeatForm, SeatQuery } from '@/api/portCustomer/seatManagement/types';
import { parseStrEmpty } from '@/utils/starcinema';

/**
 * Query Seat list
 * @param query
 * @returns {*}
 */
export const listSeat = (query?: SeatQuery): AxiosPromise<SeatVO[]> => {
  return request({
    url: '/portCustomer/seat/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Seat
 * @param id
 */
export const getSeat = (id?: string | number): AxiosPromise<SeatVO> => {
  return request({
    url: '/portCustomer/seat/' + parseStrEmpty(id),
    method: 'get'
  });
};

/**
 * Add Seat
 * @param data
 */
export const addSeat = (data: SeatForm) => {
  return request({
    url: '/portCustomer/seat',
    method: 'post',
    data: data
  });
};

/**
 * Edit Multi Seat
 * @param data
 */
export const updateSeat = (seatId: string | number | (string | number)[], data: SeatForm) => {
  return request({
    url: '/portCustomer/seat/' + seatId,
    method: 'put',
    data: data
  });
};

/**
 * Delete Seat
 * @param id
 */
export const delSeat = (id: string | number | Array<string | number>) => {
  return request({
    url: '/portCustomer/seat/' + id,
    method: 'delete'
  });
};