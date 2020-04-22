const headers = require('../../config/headers-patch')

/**
 * Replace the PATCH method by POST and add the required headers
 *
 * @var {Array<Function>}
 */
module.exports = [

  // on success
  (config) => {
    if ((/patch/i).test(config.method)) {
      config.method = 'post'
      config.headers = headers
    }
    return config
  },
]
