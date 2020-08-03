"use strict";

/**
 * Extract data set from subitems of response object
 *
 * @param {*} data
 * @return {*}
 */
module.exports = function (data) {
  if (data && data.d) {
    var _data = data,
        d = _data.d; // eslint-disable-next-line no-param-reassign

    data = d.results || d;
    Object.defineProperty(data, '__next', {
      value: d.__next,
      writable: true
    });
  }

  return data;
};