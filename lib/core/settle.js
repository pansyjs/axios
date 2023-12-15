'use strict';

import AxiosError from './AxiosError.js';

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
export default function settle(resolve, reject, response) {
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

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
