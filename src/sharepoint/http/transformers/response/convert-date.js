
/**
 * Iterate object properties to convert dates
 *
 * @param {Object} obj
 */
const lookForDates = (obj) => {

  const DATE_STR_LENGTH = 20

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'string'
        && obj[key].length === DATE_STR_LENGTH
        && Date.parse(obj[key])
    ) {
      obj[key] = new Date(obj[key])
    }
  })
}

/**
 * Sweep the response object(s) and convert dates
 *
 * @param {*} data
 */
module.exports = (data) => {

  if (data) {
    try {
      if (data.constructor === Array) {
        data.forEach(lookForDates)
      } else {
        lookForDates(data)
      }
    } catch (e) {
      /* do nothing */
    }
  }

  return data
}
