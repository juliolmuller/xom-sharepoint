
/**
 * Put the data object to higher level and wrap response metadata
 *
 * @var {Array<Function>}
 */
module.exports = [

  // on success
  (response) => {
    const { data } = response
    if (data) {
      delete response.data
      Object.defineProperty(data, '__response', { value: response })
      return data
    }
    return response
  },
]
