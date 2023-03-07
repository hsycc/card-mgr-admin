declare namespace API {
  type AccessTokenDto = {
    access_token: string;
  };

  type BatchEntity = {
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
    id: number;
    /** 批次名 */
    batch_name: string;
    /** 卡牌数 */
    count: number;
    /** 新增卡牌数 */
    new_count: number;
    /** 复刻卡牌数 */
    reprint_count: number;
    /** 备注 */
    remake: string;
    point: PointEntity;
  };

  type CardEntity = {
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
    id: number;
    serial: string;
    name: string;
    ip: string;
    series: string;
    amount: string;
    point_url: number;
    batch: BatchEntity;
  };

  type CreateBatchDto = {};

  type CreateCardDto = {};

  type CreatePointDto = {};

  type CreateUserDto = {
    /** 用户名(登录用) */
    username: string;
    /** 密码 */
    password: string;
    /** 角色类型, 1: admin， 2: user */
    role: 1 | 2;
    /** 头像url */
    avatar?: string;
  };

  type CurrentUserDto = {
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
    /** 自增id */
    id: number;
    /** 用户名,不可重复 */
    username: string;
    /** 头像 */
    avatar: string;
    /** 账号启用状态, 1: enable, 0: disable */
    status: 1 | 0;
    /** 角色类型, 1: admin， 2: user */
    role: 1 | 2;
  };

  type DeleteBatchParams = {
    id: string;
  };

  type DeleteCardParams = {
    id: string;
  };

  type DeletePointParams = {
    id: string;
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

  type PointEntity = {
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
    id: number;
    /** 码点文件存放目录路径 */
    point_path: string;
    /** 后台上传状态 */
    upload_status: number;
    /** 码点区间下限 */
    extent_min: number;
    /** 码点区间上限 */
    extent_max: number;
  };

  type QueryAllCardsParams = {
    /** 分页长度 */
    pageSize?: number;
    /** 当前页码 */
    current?: number;
    /** 模糊搜索用户id */
    search?: string;
  };

  type QueryAllCardsParams = {
    /** 分页长度 */
    pageSize?: number;
    /** 当前页码 */
    current?: number;
    /** 模糊搜索用id */
    search?: string;
  };

  type QueryAllCardsParams = {
    /** 分页长度 */
    pageSize?: number;
    /** 当前页码 */
    current?: number;
    /** 模糊搜索 id */
    search?: string;
  };

  type QueryAllUsersParams = {
    /** 分页长度 */
    pageSize?: number;
    /** 当前页码 */
    current?: number;
    /** 模糊搜索用户名/用户id */
    search?: string;
  };

  type QueryCardParams = {
    id: string;
  };

  type QueryCardParams = {
    id: string;
  };

  type QueryCardParams = {
    id: string;
  };

  type QueryUserParams = {
    id: number;
  };

  type ResPaginatedDto = {
    current: number;
    pageSize: number;
    total: number;
  };

  type ResponseDto = {
    code: number;
    message: string;
  };

  type ResponseListDto = {
    code: number;
    message: string;
    data: string[];
  };

  type ResponseObjDto = {
    code: number;
    message: string;
    data: Record<string, any>;
  };

  type ResponsePaginatedDataDto = {
    results: string[];
    pagination: ResPaginatedDto;
  };

  type ResponsePaginatedDto = {
    code: number;
    message: string;
    data: ResponsePaginatedDataDto;
  };

  type UpdateBatchDto = {};

  type UpdateBatchParams = {
    id: string;
  };

  type UpdateCardDto = {};

  type UpdateCardParams = {
    id: string;
  };

  type UpdatePasswordDto = {
    /** 密码 */
    password: string;
  };

  type UpdatePointDto = {};

  type updatePointParams = {
    id: string;
  };

  type UpdateUserRoleParams = {
    id: number;
  };

  type UpdateUserStatusParams = {
    id: number;
  };

  type UserEntity = {
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
    /** 自增id */
    id: number;
    /** 用户名,不可重复 */
    username: string;
    /** 头像 */
    avatar: string;
    /** 账号启用状态, 1: enable, 0: disable */
    status: 1 | 0;
    /** 角色类型, 1: admin， 2: user */
    role: 1 | 2;
  };
}
