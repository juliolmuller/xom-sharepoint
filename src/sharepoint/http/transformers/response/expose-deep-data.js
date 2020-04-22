
/**
 * Extract data set from subitems of response object
 *
 * @param {*} data
 * @return {*}
 */
module.exports = function(data) {
  if (data && data.d) {
    const { d } = data
    data = d.results || d
    data.__next = d.__next
    return data
  }
  return data
}
