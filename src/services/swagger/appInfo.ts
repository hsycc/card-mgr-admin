// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取Application调试信息(非生产环境可用) GET /api/app_info */
export async function appInfo(options?: { [key: string]: any }) {
  return request<API.ResponseDto>('/api/app_info', {
    method: 'GET',
    ...(options || {}),
  });
}
