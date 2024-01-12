import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { BillHisToryVO } from './types';
import { CustomerVO } from '../customer/account/types';

export const getUserInfos = (): AxiosPromise<CustomerVO[]> => {
  return request({
    url: '/system/user/profile',
    method: 'get'
  });
};

export const getBillHistoryInfos = (): AxiosPromise<BillHisToryVO[]> => {
  return request({
    url: 'booking/info',
    method: 'get'
  });
};

