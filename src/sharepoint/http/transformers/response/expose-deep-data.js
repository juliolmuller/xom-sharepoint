
/**
 * Extract data set from subitems of response object
 *
 * @param {*} data
 * @return {*}
 */
export default (data) => {

  if (data && data.d) {
    const { d } = data
    // eslint-disable-next-line no-param-reassign
    data = d.results || d
    Object.defineProperty(data, '__next', { value: d.__next || null, writable: true })
  }

  return data
}
