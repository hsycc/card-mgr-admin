// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Basic Authenticate for local strategy POST /api/auth/login */
export async function Login(body: API.LocalAuthDto, options?: { [key: string]: any }) {
  return request<
    API.ResponseObjDto & { code?: number; message?: string; data?: API.AccessTokenDto }
  >('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
