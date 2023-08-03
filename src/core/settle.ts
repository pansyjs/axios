import AxiosError from './AxiosError';

import type { AxiosResponse } from '../types';

export type ResolveFun = (response: any) => void;
export type RejectFun = (error?: AxiosError) => void;

/**
 * 创建一个带有指定消息、配置、错误代码、请求和响应的错误
 * @param resolve
 * @param reject
 * @param response
 */
function settle<T = any, D = any>(
  resolve: ResolveFun,
  reject: RejectFun,
  response: AxiosResponse<T, D>,
) {
  const {
    responseType = 'json',
    validateStatus,
    validateDataStatus
  } = response.config || {};

  if (
    response.data &&
    responseType === 'json' &&
    validateDataStatus
  ) {
    const result = validateDataStatus(response.data) || {};

    if (result.success === false) {
      reject(new AxiosError({
        message: result.message || 'Request failed with response data ' + response.data,
        code: 'ERROR_RESPONSE_DATA',
        config: response.config,
        request: response.request,
        response
      }));
      return;
    }
  }

  if (
    !response.status ||
    !validateStatus ||
    validateStatus(response.status)
  ) {
    resolve(response);
  } else {
    reject(new AxiosError({
      message: 'Request failed with status code ' + response.status,
      code: [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      config: response.config,
      request: response.request,
      response
    }));
  }
}

export default settle;
