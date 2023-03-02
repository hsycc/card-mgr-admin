// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建用户 POST /api/user */
export async function CreateUser(body: API.CreateUserDto, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查找用户 GET /api/user/${param0} */
export async function QueryUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.QueryUserParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改用户 DELETE /api/user/${param0} */
export async function DeleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeleteUserParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /api/user/current */
export async function QueryCurrentUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 启用/停用用户 PUT /api/user/enable/${param0} */
export async function UpdateUserStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UpdateUserStatusParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/user/enable/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户列表 GET /api/user/list */
export async function QueryAllUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.QueryAllUsersParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改用户角色 PUT /api/user/role/${param0} */
export async function UpdateUserRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UpdateUserRoleParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/user/role/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新用户密码 PUT /api/user/update_password */
export async function UpdatePassword(
  body: API.UpdatePasswordDto,
  options?: { [key: string]: any },
) {
  return request<API.UserEntity>('/api/user/update_password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
