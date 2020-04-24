"use strict";

/* eslint-disable no-param-reassign */

/**
 * Convert a given string to Pascal case pattern
 *
 * @param {String} str Base string to be converted
 * @return {String}
 */
module.exports = function toPascalCase(str) {
  str = String(str);
  str = str.replace(/([ ,.!?-])([A-Za-zÀ-ÿ]?)/g, function (_g0, _g1, g2) {
    return g2.toUpperCase();
  });
  return str.charAt(0).toUpperCase() + str.slice(1);
};