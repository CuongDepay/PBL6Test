import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DataHistoryVO, DataHistoryQuery } from '@/api/monitor/dataHistory/types';

/**
 * Query System data history list
 * @param query
 * @returns {*}
 */
export const listDataHistory = (query?: DataHistoryQuery): AxiosPromise<DataHistoryVO[]> => {
  return request({
    url: '/monitor/dataHistory/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of System data history
 * @param id
 */
export const getDataHistory = (id: string | number): AxiosPromise<DataHistoryVO> => {
  return request({
    url: '/monitor/dataHistory/' + id,
    method: 'get'
  });
};

/**
 * Delete System data history
 * @param id
 */
export const delDataHistory = (id: string | number | Array<string | number>) => {
  return request({
    url: '/monitor/dataHistory/' + id,
    method: 'delete'
  });
};
