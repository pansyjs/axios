import utils from '../utils';
import AxiosError from '../core/AxiosError';
import PlatformFormData from '../platform/node/classes/FormData';

/**
 * 判断给定的数据是一个数组还是 JavaScript 对象
 *
 * @param {string} thing
 *
 * @returns {boolean}
 */
function isVisitable(thing: any) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key: string) {
  return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
}
