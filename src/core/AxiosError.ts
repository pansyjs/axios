import type { AxiosResponse, InternalAxiosRequestConfig } from '../types';

interface AxiosErrorOptions<T = unknown, D = any> {
  message: string;
  code?: string;
  config?: InternalAxiosRequestConfig<D>;
  request?: any;
  response?: AxiosResponse<T, D>;
}

class AxiosError<T = unknown, D = any> extends Error {
  public isAxiosError: boolean;
  public status?: number;
  public cause?: Error;

  public code: string;
  public config: InternalAxiosRequestConfig<D>;
  public request?: any;
  public response?: AxiosResponse<T, D>;

  static ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE';
  static ERR_BAD_OPTION = 'ERR_BAD_OPTION';
  static ECONNABORTED = 'ECONNABORTED';
  static ETIMEDOUT = 'ETIMEDOUT';
  static ERR_NETWORK = 'ERR_NETWORK';
  static ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS';
  static ERR_DEPRECATED = 'ERR_DEPRECATED';
  static ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE';
  static ERR_BAD_REQUEST = 'ERR_BAD_REQUEST';
  static ERR_CANCELED = 'ERR_CANCELED';
  static ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT';
  static ERR_INVALID_URL = 'ERR_INVALID_URL';

  static from = (error, code, config, request, response, customProps) => {
    const axiosError = new AxiosError({
      message: error.message,
      code,
      config,
      request,
      response
    });

    axiosError.cause = error;
    axiosError.name = error.name;

    if (customProps) {
      Object.assign(axiosError, customProps);
    }

    return axiosError;
  }

  constructor(opts: AxiosErrorOptions<T, D>) {
    const { message, code, config,request, response } = opts;
    super(message);

    this.name = 'AxiosError';
    this.isAxiosError = true;
    this.message = message;
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }

  toJSON() {

  }
}

export default AxiosError;
