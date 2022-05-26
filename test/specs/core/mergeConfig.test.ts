import { assert, expect, describe, it } from 'vitest'

import { mergeConfig } from '../../../src/core/mergeConfig';
import { defaults } from '../../../src/defaults';

describe('core::mergeConfig', () => {
  it('should accept undefined for second argument', function() {
    expect(mergeConfig(defaults, undefined)).toEqual(defaults);
  });

  it('should accept an object for second argument', function() {
    expect(mergeConfig(defaults, {})).toEqual(defaults);
  });

  it('should not leave references', function() {
    const merged = mergeConfig(defaults, {});
    expect(merged).not.toBe(defaults);
    expect(merged.headers).not.toBe(defaults.headers);
  });
});
