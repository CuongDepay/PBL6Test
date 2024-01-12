import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MovieVO, MovieForm, MovieQuery } from '@/api/portCustomer/movieManagement/types';
import { parseStrEmpty } from '@/utils/starcinema';

/**
 * Query Cinema list
 * @param query
 * @returns {*}
 */
export const listMovie = (query?: MovieQuery): AxiosPromise<MovieVO[]> => {
  return request({
    url: '/portCustomer/movie/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of Cinema
 * @param id
 */
export const getMovie = (id?: string | number): AxiosPromise<MovieVO> => {
  return request({
    url: '/portCustomer/movie/' + parseStrEmpty(id),
    method: 'get'
  });
};

/**
 * Add Cinema
 * @param data
 */
export const addMovie = (data: MovieForm) => {
  return request({
    url: '/portCustomer/movie',
    method: 'post',
    data: data
  });
};

/**
 * Edit Cinema
 * @param data
 */
export const updateMovie = (data: MovieForm) => {
  return request({
    url: '/portCustomer/movie',
    method: 'put',
    data: data
  });
};

/**
 * Delete Cinema
 * @param id
 */
export const delMovie = (id: string | number | Array<string | number>) => {
  return request({
    url: '/portCustomer/movie/' + id,
    method: 'delete'
  });
};
