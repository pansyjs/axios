export type AxiosHeaderValue = AxiosHeaders | string | string[] | number | boolean | null;

type CommonRequestHeadersList = 'Accept' | 'Content-Length' | 'User-Agent' | 'Content-Encoding' | 'Authorization';
type ContentType = AxiosHeaderValue | 'text/html' | 'text/plain' | 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded' | 'application/octet-stream';

interface RawAxiosHeaders {
  [key: string]: AxiosHeaderValue;
}

export type RawAxiosRequestHeaders = Partial<RawAxiosHeaders & {
  [Key in CommonRequestHeadersList]: AxiosHeaderValue;
} & {
  'Content-Type': ContentType
}>;

export type AxiosRequestHeaders = RawAxiosRequestHeaders & AxiosHeaders;

export class AxiosHeaders {}

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK';

export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

export type responseEncoding =
  | 'ascii' | 'ASCII'
  | 'ansi' | 'ANSI'
  | 'binary' | 'BINARY'
  | 'base64' | 'BASE64'
  | 'base64url' | 'BASE64URL'
  | 'hex' | 'HEX'
  | 'latin1' | 'LATIN1'
  | 'ucs-2' | 'UCS-2'
  | 'ucs2' | 'UCS2'
  | 'utf-8' | 'UTF-8'
  | 'utf8' | 'UTF8'
  | 'utf16le' | 'UTF16LE';

export interface AxiosRequestConfig<D = any> {
  /** 用于请求的服务器 URL */
  url?: string;
  /**
   * 是创建请求时使用的方法
   * @default 'get'
   */
  method?: Method | string;
  /**
   * 可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
   * `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
   */
  baseURL?: string;
  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
  validateStatus?: ((status: number) => boolean) | null;

  validateDataStatus?: ((data?: any) => { success: boolean; message?: string }) | null;

  // `data` 是作为请求体被发送的数据
  // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属: FormData, File, Blob
  // - Node 专属: Stream, Buffer
  data?: D;

  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  // 默认值是 `0` (永不超时)
  timeout?: number;

  /**
   * 表示浏览器将要响应的数据类型
   * 浏览器专属：'blob'
   */
  responseType?: ResponseType;

  /** xsrf token 的值，被用作 cookie 的名称 */
  xsrfCookieName?: string;
  /** 带有 xsrf token 值的http 请求头名称 */
  xsrfHeaderName?: string;

  /** 定义了node.js中允许的HTTP响应内容的最大字节数 */
  maxContentLength: number;

  /** `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数 */
  maxBodyLength: number;
}

export interface InternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
  headers: AxiosRequestHeaders;
}

export interface AxiosResponse<T = any, D = any> {
  /** 服务器提供的响应数据 */
  data: T;
  /** 来自服务器响应的 HTTP 状态码 */
  status: number;
  /** 来自服务器响应的 HTTP 状态信息 */
  statusText: string;
  /** 请求的配置信息 */
  config: InternalAxiosRequestConfig<D>;
  /**
   * 生成此响应的请求
   * 在 Node 中它是最后一个ClientRequest实例 (in redirects)
   * 在浏览器中则是 XMLHttpRequest 实例
   */
  request?: any;
}
