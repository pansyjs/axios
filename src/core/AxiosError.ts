import type { AxiosRequestConfig, AxiosResponse, } from '../types';

export class AxiosError<T = unknown, D = any> extends Error {
  public code: string;
  public config: AxiosRequestConfig<D>;
  public request: any;
  public response?: AxiosResponse<T, D>;
  public name = 'AxiosError';
  public isAxiosError = true;

  static readonly ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
  static readonly ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
  static readonly ERR_BAD_OPTION = "ERR_BAD_OPTION";
  static readonly ERR_NETWORK = "ERR_NETWORK";
  static readonly ERR_DEPRECATED = "ERR_DEPRECATED";
  static readonly ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
  static readonly ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
  static readonly ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
  static readonly ERR_INVALID_URL = "ERR_INVALID_URL";
  static readonly ERR_CANCELED = "ERR_CANCELED";
  static readonly ECONNABORTED = "ECONNABORTED";
  static readonly ETIMEDOUT = "ETIMEDOUT";

  constructor(
    message: string,
    code?: string,
    config?: AxiosRequestConfig<D>,
    request?: any,
    response?: AxiosResponse<T, D>
  ) {
    super();

    this.code = code;
    this.config = config;
    this.request = request;
    this.response = response;
  }

}
