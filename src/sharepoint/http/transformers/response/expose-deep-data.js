
/**
 * Extract data set from subitems of response object
 *
 * @param {*} data
 * @return {*}
 */
module.exports = function(data) {
  if (data && data.d) {
    return {
      __next: data.d.__next,
      ...(data.d.results || data.d),
    }
  }
  return data
}
