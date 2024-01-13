import {
  toFixed,
} from '$lib/helpers/toFixed.js';

/**
 * 
 * @param key {String | null}
 * @param value {String | null}
 */
export const formatNumber = (key = null, value = null) => {
  switch(key) {
    case 'avg': 
    case 'mean':
    case 'sum':
    case 'min':
    case 'max':
    {
      return toFixed(Number.parseFloat(value), 5);
    }
    case 'median': {
      return toFixed(Number.parseFloat(value), 2);
    }
    default: {
      throw new TypeError(`unknown key: ${key}`);
    }
  }
};