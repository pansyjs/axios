import settle from './settle';

import type { AxiosResponse } from '../types';

interface ResponseData<D = any> {
  code: number;
  message: string;
  data?: any;
  [key: string]: any;
}

let resolve: any;
let reject: any;

describe('core::settle', () => {
  beforeEach(() => {
    resolve = vi.fn();
    reject = vi.fn();
  })

  it('should resolve promise if status is not set', () => {
    const response = {
      config: {
        validateStatus: function() {
          return true;
        }
      }
    } as unknown as AxiosResponse;

    settle(resolve, reject, response);

    expect(resolve).toHaveBeenCalledWith(response);
    expect(reject).not.toHaveBeenCalled();
  })

  it('should resolve promise if validateStatus is not set', () => {
    const response = {
      status: 500,
      config: {}
    } as unknown as AxiosResponse;

    settle(resolve, reject, response);
    expect(resolve).toHaveBeenCalledWith(response);
    expect(reject).not.toHaveBeenCalled();
  });

  it('should resolve promise if validateStatus returns true', () => {
    const response = {
      status: 500,
      config: {
        validateStatus: function() {
          return true;
        }
      }
    } as unknown as AxiosResponse;
    settle(resolve, reject, response);
    expect(resolve).toHaveBeenCalledWith(response);
    expect(reject).not.toHaveBeenCalled();
  });

  it('should reject promise if validateStatus returns false', () => {
    const req = {
      path: '/foo'
    };
    const response: AxiosResponse = {
      status: 500,
      config: {
        validateStatus: function() {
          return false;
        }
      },
      request: req
    } as unknown as AxiosResponse;
    settle(resolve, reject, response);
    expect(resolve).not.toHaveBeenCalled();
    expect(reject).toHaveBeenCalled();

    const reason = reject.mock.calls[0][0];
    expect(reason instanceof Error).toBe(true);
    expect(reason.message).toBe('Request failed with status code 500');
    expect(reason.config).toBe(response.config);
    expect(reason.request).toBe(req);
    expect(reason.response).toBe(response);
  });

  it('should pass status to validateStatus', () => {
    const validateStatus = vi.fn();
    const response = {
      status: 500,
      config: {
        validateStatus: validateStatus
      }
    } as unknown as AxiosResponse;

    settle(resolve, reject, response);
    expect(validateStatus).toHaveBeenCalledWith(500);
  });

  it('1', () => {
    const response: AxiosResponse<ResponseData> = {
      data: {
        code: 400001,
        message: 'Auth error'
      },
      status: 200,
      config: {
        validateDataStatus: (data: ResponseData) => {
          console.log(data);
          return {
            success: data.code === 0,
            message: data.message
          }
        },
      }
    } as unknown as AxiosResponse;

    settle(resolve, reject, response);

    expect(resolve).not.toHaveBeenCalled();
    expect(reject).toHaveBeenCalled();

    const reason = reject.mock.calls[0][0];
    expect(reason instanceof Error).toBe(true);

    expect(reason.message).toBe('Auth error');
  });
})
