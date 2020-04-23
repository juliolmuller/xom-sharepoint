
/**
 * Extract data set from subitems of response object
 *
 * @param {*} data
 * @return {*}
 */
module.exports = (data) => {
  if (data && data.d) {
    const { d } = data
    // eslint-disable-next-line no-param-reassign
    data = d.results || d
    data.__next = d.__next
    return data
  }
  return data
}
