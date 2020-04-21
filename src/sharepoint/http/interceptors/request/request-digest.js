const http = require('../../axios-instance')

/**
 * Add the header for the request digest token
 *
 * @var {Array<Function>}
 */
module.exports = [

  // on success
  async (config) => {
    const { digest, method } = config
    if (digest !== false && (/patch/i).test(method)) {
      config.method = 'post'
      config.headers = {
        ...config.headers,
        'X-RequestDigest': await http.defaults.requestDigest,
      }
    }
    return config
  },

  // on error
  Promise.reject,
]
