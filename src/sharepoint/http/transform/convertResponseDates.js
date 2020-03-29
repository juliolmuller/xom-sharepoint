
/**
 * Regular expression pattern for dates coming from SharePoint
 *
 * @const {RegExp}
 */
const SP_DATE_PATTERN = /^\/Date\((\d+)\)\/$/

/**
 * Amount of milliseconds per minute
 *
 * @const {number}
 */
const MILLISECONDS_PER_MINUTE = 60000

/**
 * Convert a SharePoint date notation to a JS Date object
 *
 * @param {string} spDate
 * @return {Date}
 */
function convertToDate(spDate) {
  spDate = String(spDate).replace(/\D/g, '')
  spDate = new Date(Number(spDate))
  spDate = spDate.getTime() + (spDate.getTimezoneOffset() * MILLISECONDS_PER_MINUTE)
  return new Date(spDate)
}

/**
 * Iterate object properties to convert dates
 *
 * @param {object} obj
 */
function sweepObject(obj) {
  Object.keys(obj).forEach((key) => {
    if (SP_DATE_PATTERN.test(obj[key])) {
      obj[key] = convertToDate(obj[key])
    }
  })
}

/**
 * Seep the response object(s) and convert dates
 *
 * @param {*} data
 */
module.exports = function convertResponseDates(data) {
  if (data) {
    try {
      if (data.constructor === Array) {
        data.forEach(sweepObject)
      } else {
        sweepObject(data)
      }
    } catch (e) { /* Ignore */ }
  }
  return data
}