import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message as Message } from 'antd';
import { stringify } from 'query-string';
import { AUTH_TOKEN } from './constants';

// 与后端约定的响应数据格式
interface ResponseStructure {
  code?: number;
  message?: string;
  data: any;
}
// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

// 鉴权白名单
const AuthWhiteList = ['/api/auth/login'];

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出 errorThrower 是利用 responseInterceptors 实现的，它的触发条件是: 当 data.success 为 false 时。自行实现
    // errorThrower: (res) => {},

    // 错误接收及处理
    errorHandler: (error: any, req: any) => {
      if (req?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { message, code } = errorInfo;

          const { search, pathname } = window.location;
          const urlParams = new URL(window.location.href).searchParams;
          /** 此方法会跳转到 redirect 参数所在的位置 */
          const redirect = urlParams.get('redirect');

          console.log(errorInfo);
          switch (code) {
            case 401:
              // 令牌失效
              // Note: There may be security issues, please note
              if (window.location.pathname !== '/user/login' && !redirect) {
                history.replace({
                  pathname: '/user/login',
                  search: stringify({
                    redirect: pathname + search,
                  }),
                });
              }
            case 403:
            // 无权限
            default:
              Message.error(message);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        Message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        Message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        Message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      if (config.headers && !AuthWhiteList.includes(config.url as string)) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(AUTH_TOKEN)}` || '';
      }

      // if (config.query) {
      //   config.url = config.url + '?' + qs.stringify(config.query);
      // }

      return { ...config };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 一些 response body 不是 JSON, 设置自定义的响应头,
      // if (response.headers.get('response-type') === 'blob') {
      //   const blob = await response.clone().blob();
      //   return blob;
      // }
      // // 拦截响应数据，进行个性化处理
      const { data, code, message } = response.data as unknown as ResponseStructure;

      // 业务层的异常最好不用HTTPCode做区分
      // 后端接口定义 code !== 0 情况为业务层异常
      if (code !== 0) {
        const error: any = new Error(message);
        error.name = 'BizError';
        error.info = { code, message, data };
        throw error; // 抛出自制的错误
      }

      return response;
    },
  ],
};
