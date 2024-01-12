import request from '@/utils/request';
import { NoticeQuery, NoticeVO } from '@/api/system/notice/types';
import { AxiosPromise } from 'axios';
// Query Announcement List
export function listBulletin(query: NoticeQuery): AxiosPromise<NoticeVO[]> {
  return request({
    url: '/bulletin/list',
    method: 'get',
    params: query
  });
}
