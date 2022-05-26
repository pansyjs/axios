// TypeScript Version: 4.1
export type AxiosHeaderValue = string | string[] | number | boolean;

export type AxiosHeaders = Record<string, AxiosHeaderValue>;

export type MethodsHeaders = {
  [Key in Method as Lowercase<Key>]: AxiosHeaders;
};

export interface CommonHeaders {
  common: AxiosHeaders;
}

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

export type AxiosRequestHeaders = Partial<CommonHeaders & AxiosHeaders & MethodsHeaders>;

export type AxiosResponseHeaders = Record<string, string> & {
  'set-cookie'?: string[];
};

export interface AxiosRequestTransformer {
  (data: any, headers: AxiosRequestHeaders): any;
}

export interface AxiosResponseTransformer {
  (data: any, headers?: AxiosResponseHeaders, status?: number): any;
}

export interface TransitionalOptions {
  silentJSONParsing?: boolean;
  forcedJSONParsing?: boolean;
  clarifyTimeoutError?: boolean;
}

export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}

export interface AxiosRequestConfig<D = any> {
  /** 用于请求的服务器 URL */
  url?: string;

  /** 创建请求时使用的方法 */
  method?: Method | string;

  /**
   * 自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
   * 可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
   */
  baseURL?: string;

  /**
   * 允许在向服务器发送前，修改请求数据
   * 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
   * 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
   */
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];

  /**
   * 传递给 then/catch 前，允许修改响应数据
   */
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];

  /** 自定义请求头 */
  headers?: AxiosRequestHeaders;

  /**
   * 与请求一起发送的 URL 参数
   * 必须是一个简单对象或 URLSearchParams 对象
   */
  params?: any;

  /**
   * 指定请求超时的毫秒数
   * 如果请求时间超过 `timeout` 的值，则请求会被中断
   */
  timeout?: number;

  /**
   * `xsrfCookieName` 是 xsrf token 的值，被用作 cookie 的名称
   */
  xsrfCookieName?: string;

  /**
   * `xsrfHeaderName` 是带有 xsrf token 值的 http 请求头名称
   */
  xsrfHeaderName?: string;

  /**
   * 定义了node.js中允许的HTTP响应内容的最大字节数
   */
  maxContentLength?: number;

  /**
   * 定义允许的http请求内容的最大字节数(仅Node）
   */
  maxBodyLength?: number;

  /**
   * 定义给定的 HTTP状态码是 resolve 还是 reject promise。
   * 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，则promise 将会 resolved，否则是 rejected。
   */
  validateStatus?: ((status: number) => boolean) | null;

  transitional?: TransitionalOptions;
}
