declare namespace API {
  type CreateUserDto = {
    /** 用户名(登录用) */
    username: string;
    /** 密码 */
    password: string;
    /** 角色类型, 1: admin， 2: user */
    role: 1 | 2;
  };

  type DeleteUserParams = {
    id: number;
  };

  type LocalAuthDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type QueryAllUsersParams = {
    /** 分页长度 */
    pageSize?: number;
    /** 当前页码 */
    current?: number;
    /** 模糊搜索用户名/用户id */
    search?: string;
  };

  type QueryUserParams = {
    id: number;
  };

  type UpdatePasswordDto = {
    /** 密码 */
    password: string;
  };

  type UpdateUserRoleParams = {
    id: number;
  };

  type UpdateUserStatusParams = {
    id: number;
  };

  type UserEntity = {
    /** 创建时间 */
    createdAt: any;
    /** 更新时间 */
    updatedAt: any;
    /** 删除时间 */
    deletedAt: any;
    id: number;
    username: string;
    avatar: string;
    status: number;
    role: number;
  };
}
