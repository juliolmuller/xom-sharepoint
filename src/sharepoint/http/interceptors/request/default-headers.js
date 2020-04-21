const headers = require('../../config/headers-common')

/**
 * Add the default headers to all requests
 *
 * @var {Array<Function>}
 */
module.exports = [

  // on success
  async (config) => {
    config.withCredentials = true
    config.headers = headers
    return config
  },

  // on error
  Promise.reject,
]
