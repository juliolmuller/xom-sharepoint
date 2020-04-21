const axios = require('axios').default
const exposeDeepData = require('./expose-deep-data')
const convertDate = require('./convert-date')

/**
 * Chain of functions to transform response
 *
 * @var {Array<Function>}
 */
module.exports = [
  // custom functions
  // ...

  // JSON parse
  ...axios.defaults.transformResponse,

  // custom functions
  exposeDeepData,
  convertDate,
]
