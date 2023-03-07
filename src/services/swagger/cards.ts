// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取卡牌列表 GET /api/cards */
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
        results?: API.CardEntity[];
        pagination?: API.ResPaginatedDto;
      };
    }
  >('/api/cards', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建卡牌 POST /api/cards */
export async function CreateCard(body: API.CreateCardDto, options?: { [key: string]: any }) {
  return request<API.ResponseObjDto & { code?: number; message?: string; data?: API.CardEntity }>(
    '/api/cards',
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

/** 获取卡牌信息 GET /api/cards/${param0} */
export async function QueryCard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.QueryCardParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseObjDto & { code?: number; message?: string; data?: API.CardEntity }>(
    `/api/cards/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 软删除单个 DELETE /api/cards/${param0} */
export async function DeleteCard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeleteCardParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseDto>(`/api/cards/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新卡牌信息 PATCH /api/cards/${param0} */
export async function UpdateCard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UpdateCardParams,
  body: API.UpdateCardDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseDto>(`/api/cards/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 导出卡牌码点 POST /api/cards/export_points */
export async function ExportPoints(options?: { [key: string]: any }) {
  return request<API.ResponseObjDto & { code?: number; message?: string; data?: API.CardEntity }>(
    '/api/cards/export_points',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 获取 ip group GET /api/cards/get_ip_group */
export async function QueryGroupIp(options?: { [key: string]: any }) {
  return request<any>('/api/cards/get_ip_group', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取 series group GET /api/cards/get_series_group */
export async function QueryGroupSeries(options?: { [key: string]: any }) {
  return request<any>('/api/cards/get_series_group', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 导入批次卡牌 POST /api/cards/import_cards */
export async function ImportCards(options?: { [key: string]: any }) {
  return request<API.ResponseObjDto & { code?: number; message?: string; data?: API.CardEntity }>(
    '/api/cards/import_cards',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}
