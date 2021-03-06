/**
 * Util for converting number of bytes to size string. 
 *
 * @module utils/bytes-to-string
 * @author Jakub Liput, Michal Borzecki
 * @copyright (C) 2016-2017 ACK CYFRONET AGH
 * @license This software is released under the MIT license cited in 'LICENSE.txt'.
 */

const TERA = 1000000000000;
const GIGA = 1000000000;
const MEGA = 1000000;
const KILO = 1000;

export const iecUnits = [{
  name: 'B',
  multiplicator: 1,
}, {
  name: 'KiB',
  multiplicator: 1024,
}, {
  name: 'MiB',
  multiplicator: 1048576,
}, {
  name: 'GiB',
  multiplicator: 1073741824,
}, {
  name: 'TiB',
  multiplicator: 1099511627776,
}];

function bytesToStringIEC(bytes) {
  let number = bytes;
  let unit = iecUnits[0];
  iecUnits.slice(1).forEach((u) => {
    if (bytes >= u.multiplicator) {
      unit = u;
      number = bytes / u.multiplicator;
    }
  });
  return [number, unit.multiplicator, unit.name];
}

function bytesToStringSI(bytes) {
  let number = bytes;
  let unit = 'B';
  let multiplicator = 1;
  if (bytes >= TERA) {
    unit = 'TB';
    number = bytes / TERA;
    multiplicator = TERA;
  } else if (bytes >= GIGA) {
    unit = 'GB';
    number = bytes / GIGA;
    multiplicator = GIGA;
  } else if (bytes >= MEGA) {
    unit = 'MB';
    number = bytes / MEGA;
    multiplicator = MEGA;
  } else if (bytes >= KILO) {
    unit = 'KB';
    number = bytes / KILO;
    multiplicator = KILO;
  }
  return [number, multiplicator, unit];
}

/**
 * Convert number of bytes to human readable size string. Eg. 2.34 MB.
 * IEC format (KiB, MiB, etc.) can also be used (see options).
 * 
 * @param {Number} bytes
 * @param {Object} [options]
 * @param {Boolean} [options.iecFormat=true] If true, use IEC format: KiB, MiB, GiB
 * @param {Boolean} [options.separated=false] If true, instead of string, 
 * object with fields: number {number}, multiplicator {number}, unit {string}
 * will be returned.
 * @returns {string|object}
 */
export default function bytesToString(bytes, options = {}) {
  let iecFormat = options.iecFormat;
  let separated = options.separated;

  if (iecFormat === undefined) {
    iecFormat = true;
  }
  if (separated === undefined) {
    separated = false;
  }
  
  if (!bytes && bytes !== 0) {
    return '';
  } else {
    let [number, multiplicator, unit] =
      (iecFormat ? bytesToStringIEC : bytesToStringSI)(bytes);
    number = Math.round(number * 10) / 10;
    if (separated) {
      return {
        number,
        multiplicator,
        unit,
      };
    } else {
      return `${number} ${unit}`;
    }
  }
}
