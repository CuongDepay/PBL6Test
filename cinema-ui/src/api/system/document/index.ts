import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DocumentVO, DocumentForm, DocumentQuery } from '@/api/system/document/types';

/**
 * Query System document list
 * @param query
 * @returns {*}
 */
export const listDocument = (query?: DocumentQuery): AxiosPromise<DocumentVO[]> => {
  return request({
    url: '/system/document/list',
    method: 'get',
    params: query
  });
};

/**
 * Query detail of System document
 * @param id
 */
export const getDocument = (id: string | number): AxiosPromise<DocumentVO> => {
  return request({
    url: '/system/document/' + id,
    method: 'get'
  });
};

/**
 * Add System document
 * @param data
 */
export const addDocument = (data: DocumentForm) => {
  return request({
    url: '/system/document',
    method: 'post',
    data: data
  });
};

/**
 * Edit System document
 * @param data
 */
export const updateDocument = (data: DocumentForm) => {
  return request({
    url: '/system/document',
    method: 'put',
    data: data
  });
};

/**
 * Delete System document
 * @param id
 */
export const delDocument = (id: string | number | Array<string | number>) => {
  return request({
    url: '/system/document/' + id,
    method: 'delete'
  });
};

/**
 * Document Status Modification
 * @param id      Document ID
 * @param status  Document status
 */
export function changeDocumentStatus(id: number | string, status: string) {
  const data = {
    id,
    status
  };
  return request({
    url: '/system/document/changeStatus',
    method: 'put',
    data: data
  });
}
