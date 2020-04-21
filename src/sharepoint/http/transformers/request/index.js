const axios = require('axios').default

/**
 * Chain of functions to transform request
 *
 * @var {Array<Function>}
 */
module.exports = [
  // custom functions
  // ...

  // JSON stringify
  ...axios.defaults.transformRequest,

  // custom functions
  // ...
]
