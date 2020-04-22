
/**
 * Put the data object to higher level and wrap response metadata
 *
 * @var {Array<Function>}
 */
module.exports = [

  // on success
  (response) => {
    const { data } = response
    delete response.data
    data.__response = response
    return data
  },
]
