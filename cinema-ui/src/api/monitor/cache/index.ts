import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CacheVO } from './types';

// Query Cache Details
export function getCache(): AxiosPromise<CacheVO> {
  return request({
    url: '/monitor/cache',
    method: 'get'
  });
}

// Query the list of cache names
export function listCacheName() {
  return request({
    url: '/monitor/cache/getNames',
    method: 'get'
  });
}

// Query the list of cache keys
export function listCacheKey(cacheName: string) {
  return request({
    url: '/monitor/cache/getKeys/' + cacheName,
    method: 'get'
  });
}

// Query cache content
export function getCacheValue(cacheName: string, cacheKey: string) {
  return request({
    url: '/monitor/cache/getValue/' + cacheName + '/' + cacheKey,
    method: 'get'
  });
}

// Clear the specified name cache
export function clearCacheName(cacheName: string) {
  return request({
    url: '/monitor/cache/clearCacheName/' + cacheName,
    method: 'delete'
  });
}

// Clear the specified key name cache
export function clearCacheKey(cacheName: string, cacheKey: string) {
  return request({
    url: '/monitor/cache/clearCacheKey/' + cacheName + '/' + cacheKey,
    method: 'delete'
  });
}

// clear all cache
export function clearCacheAll() {
  return request({
    url: '/monitor/cache/clearCacheAll',
    method: 'delete'
  });
}
