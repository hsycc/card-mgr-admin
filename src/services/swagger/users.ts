// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取用户列表 GET /api/users */
export async function QueryAllUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.QueryAllUsersParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponsePaginatedDto & {
      code?: number;
      message?: string;
      data?: API.ResponsePaginatedDataDto & {
        results?: API.UserEntity[];
        pagination?: API.ResPaginatedDto;
      };
    }
  >('/api/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建用户 POST /api/users */
export async function CreateUser(body: API.CreateUserDto, options?: { [key: string]: any }) {
  return request<API.ResponseObjDto & { code?: number; message?: string; data?: API.UserEntity }>(
    '/api/users',
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

/** 查找用户 GET /api/users/${param0} */
export async function QueryUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.QueryUserParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseObjDto & { code?: number; message?: string; data?: API.UserEntity }>(
    `/api/users/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 软删除用户 DELETE /api/users/${param0} */
export async function DeleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeleteUserParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseDto>(`/api/users/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /api/users/current */
export async function QueryCurrentUser(options?: { [key: string]: any }) {
  return request<
    API.ResponseObjDto & { code?: number; message?: string; data?: API.CurrentUserDto }
  >('/api/users/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 启用/停用用户 PATCH /api/users/enable/${param0} */
export async function UpdateUserStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UpdateUserStatusParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseDto>(`/api/users/enable/${param0}`, {
    method: 'PATCH',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改用户角色 PATCH /api/users/role/${param0} */
export async function UpdateUserRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UpdateUserRoleParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseDto>(`/api/users/role/${param0}`, {
    method: 'PATCH',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新用户密码 PATCH /api/users/update_password */
export async function UpdatePassword(
  body: API.UpdatePasswordDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto>('/api/users/update_password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
