const kindOf = (function(cache) {
  return function(thing) {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
})(Object.create(null));

function kindOfTest(type: string) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}

/**
 * 检查值是否为数组
 * @param val
 * @returns
 */
export function isArray(val: any): val is any[] {
  return Array.isArray(val)
}

/**
 * 合并对象
 * @param objs
 * @returns
 */
 export function merge(...objs: any[]) {
  const result = {};

  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = objs.length; i < l; i++) {
    forEach(objs[i], assignValue);
  }
  return result;
}

/**
 * 检查值是否为 undefined
 * @param val
 * @returns
 */
export function isUndefined(val: any): val is undefined {
  return typeof val === 'undefined';
}

/**
 * 检查值是否是一个普通对象。
 * @param val
 * @returns
 */
export function isPlainObject(val: any): val is Record<keyof any, any> {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * 迭代一个数组或一个对象，为每个项目调用一个函数。
 * @param obj
 * @param fn
 * @returns
 */
export function forEach(
  obj: Record<string, any> | any[],
  fn: (...args: any[]) => any
) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

