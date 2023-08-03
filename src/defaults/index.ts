import type { InternalAxiosRequestConfig } from '../types';

const DEFAULT_CONTENT_TYPE = {
  'Content-Type': undefined
};

const defaults: InternalAxiosRequestConfig = {
  /**
   * 用于中止请求的超时时间，单位为毫秒。如果设置为 0（默认值），则不会超时
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
}

export default defaults;
