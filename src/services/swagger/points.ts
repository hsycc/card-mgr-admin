// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取码点列表 GET /api/points */
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
        results?: API.PointEntity[];
        pagination?: API.ResPaginatedDto;
      };
    }
  >('/api/points', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建码点区域 POST /api/points */
export async function createPoint(body: API.CreatePointDto, options?: { [key: string]: any }) {
  return request<API.ResponseObjDto & { code?: number; message?: string; data?: API.PointEntity }>(
    '/api/points',
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

/** 获取码点信息 GET /api/points/${param0} */
export async function QueryCard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.QueryCardParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseObjDto & { code?: number; message?: string; data?: API.PointEntity }>(
    `/api/points/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 软删除单个 DELETE /api/points/${param0} */
export async function DeletePoint(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeletePointParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseDto>(`/api/points/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新码点区域 PATCH /api/points/${param0} */
export async function updatePoint(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updatePointParams,
  body: API.UpdatePointDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseDto>(`/api/points/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
