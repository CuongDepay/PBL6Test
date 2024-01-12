import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {
  BookingVO,
  BookingDetailVO,
  BookingForm,
  BookingDetailForm,
  BookingQuery,
  BookingDetailQuery
} from '@/api/portCustomer/ticketManagement/types';
import { parseStrEmpty } from '@/utils/starcinema';

/**
 * Query Booking list
 * @param query
 * @returns {*}
 */
export const listBooking = (query?: BookingQuery): AxiosPromise<BookingVO[]> => {
  return request({
    url: '/portCustomer/booking/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Booking
 * @param id
 */
export const getBooking = (id?: string | number): AxiosPromise<BookingVO> => {
  return request({
    url: '/portCustomer/booking/' + parseStrEmpty(id),
    method: 'get'
  });
};

/**
 * Add Booking
 * @param data
 */
export const addBooking = (data: BookingForm) => {
  return request({
    url: '/portCustomer/booking',
    method: 'post',
    data: data
  });
};

/**
 * Edit Booking
 * @param data
 */
export const updateBooking = (data: BookingForm) => {
  return request({
    url: '/portCustomer/booking',
    method: 'put',
    data: data
  });
};

/**
 * Delete Booking
 * @param id
 */
export const delBooking = (id: string | number | Array<string | number>) => {
  return request({
    url: '/portCustomer/booking/' + id,
    method: 'delete'
  });
};

/**
 * Query Booking list
 * @param query
 * @returns {*}
 */
export const listBookingDetail = (query?: BookingDetailQuery): AxiosPromise<BookingDetailVO[]> => {
  return request({
    url: '/portCustomer/bookingDetail/list',
    method: 'get',
    params: query
  });
};

/**
 * Edit Booking
 * @param data
 */
export const updateBookingDetail = (bookingDetail: BookingDetailVO[], bookingId: string | number) => {
  return request({
    url: '/portCustomer/bookingDetail/booking/' + bookingId,
    method: 'put',
    data: bookingDetail
  });
};
