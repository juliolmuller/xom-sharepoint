const headers = require('../../config/headers-delete')

/**
 * Replace the DELETE method by POST and add the required headers
 *
 * @var {Array<Function>}
 */
module.exports = [

  // on success
  (config) => {
    if ((/delete/i).test(config.method)) {
      config.method = 'post'
      config.headers = headers
    }
    return config
  },

  // on error
  Promise.reject,
]
