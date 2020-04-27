/* eslint-disable no-param-reassign */

/**
 * Convert a given string to Pascal case pattern
 *
 * @param {String} str Base string to be converted
 * @return {String}
 */
module.exports = function toPascalCase(str) {

  str = String(str)
  str = str.replace(/([ ,.!?-])([A-Za-zÀ-ÿ]?)/g, (_g0, _g1, g2) => g2.toUpperCase())

  // eslint-disable-next-line no-magic-numbers
  return str.charAt(0).toUpperCase() + str.slice(1)
}
