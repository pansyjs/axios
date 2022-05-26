import { forEach, merge, } from '../utils';
import { transitionalDefaults } from './transitional';

import type { AxiosRequestConfig, } from '../types';

const DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

export const defaults: AxiosRequestConfig = {
  transitional: transitionalDefaults,

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
  } as unknown as AxiosRequestConfig['headers']
}

forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  // @ts-ignore
  defaults.headers[method] = {};
});

forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  // @ts-ignore
  defaults.headers[method] = merge(DEFAULT_CONTENT_TYPE);
});
