import request from '@/utils/request';
import { PostForm, PostQuery, PostVO } from './types';
import { AxiosPromise } from 'axios';

// Query job list
export function listPost(query: PostQuery): AxiosPromise<PostVO[]> {
  return request({
    url: '/system/post/list',
    method: 'get',
    params: query
  });
}

// Query job details
export function getPost(postId: string | number): AxiosPromise<PostVO> {
  return request({
    url: '/system/post/' + postId,
    method: 'get'
  });
}

// new jobs
export function addPost(data: PostForm) {
  return request({
    url: '/system/post',
    method: 'post',
    data: data
  });
}

// modify position
export function updatePost(data: PostForm) {
  return request({
    url: '/system/post',
    method: 'put',
    data: data
  });
}

// delete post
export function delPost(postId: string | number | (string | number)[]) {
  return request({
    url: '/system/post/' + postId,
    method: 'delete'
  });
}
