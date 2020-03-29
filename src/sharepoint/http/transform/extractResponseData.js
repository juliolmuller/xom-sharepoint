
/**
 * Extract data set from subitems of response object
 *
 * @param {*} data
 * @return {*}
 */
module.exports = function extractResponseData(data) {
  if (data && data.d) {
    return data.d.results || data.d
  }
  return data
}
