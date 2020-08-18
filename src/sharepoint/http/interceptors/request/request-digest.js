
/**
 * Add the header for the request digest token
 *
 * @param {Axios} httpInstance
 * @return {Array<Function>}
 */
export default (httpInstance) => [

  // on success
  async (config) => {

    const { digest, method } = config

    if (digest !== false && (/post/i).test(method)) {
      config.method = 'post'
      config.headers = {
        ...config.headers,
        'X-RequestDigest': await httpInstance.defaults.requestDigest,
      }
    }

    return config
  },
]
