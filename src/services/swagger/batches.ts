// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取列表 GET /api/batches */
export async function QueryAllCards(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.QueryAllCardsParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponsePaginatedDto & {
      code?: number;
      message?: string;
      data?: API.ResponsePaginatedDataDto & {
        results?: API.BatchEntity[];
        pagination?: API.ResPaginatedDto;
      };
    }
  >('/api/batches', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建 POST /api/batches */
export async function CreateBatch(body: API.CreateBatchDto, options?: { [key: string]: any }) {
  return request<API.ResponseObjDto & { code?: number; message?: string; data?: API.BatchEntity }>(
    '/api/batches',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 获取单个信息 GET /api/batches/${param0} */
export async function QueryCard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.QueryCardParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseObjDto & { code?: number; message?: string; data?: API.BatchEntity }>(
    `/api/batches/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 软删除单个 DELETE /api/batches/${param0} */
export async function DeleteBatch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeleteBatchParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseDto>(`/api/batches/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 PATCH /api/batches/${param0} */
export async function UpdateBatch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UpdateBatchParams,
  body: API.UpdateBatchDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseDto>(`/api/batches/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
