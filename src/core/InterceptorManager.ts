import { forEach } from '../utils';

import type { AxiosRequestConfig } from '../types';

export interface AxiosInterceptorOptions {
  synchronous?: boolean;
  runWhen?: (config: AxiosRequestConfig) => boolean;
}

export interface Interceptor<V = any, T = V> extends AxiosInterceptorOptions {
  fulfilled: (value: V) => T | Promise<T>;
  rejected?: (error: any) => any;
}

export class InterceptorManager<V> {
  public handlers: Interceptor<V, any>[];

  constructor() {
    this.handlers = [];
  }

  use<T = V>(
    fulfilled: Interceptor<V, T>['fulfilled'],
    rejected?: Interceptor<V, T>['rejected'],
    options?: AxiosInterceptorOptions
  ) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });

    return this.handlers.length - 1;
  }

  eject(id: number) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  forEach(fn: (args: any) => any) {
    forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
