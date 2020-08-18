import headers from '../../config/headers-common'

/**
 * Add the default headers to all requests
 *
 * @var {Array<Function>}
 */
export default [

  // on success
  (config) => {

    config.withCredentials = true
    config.headers = headers

    return config
  },
]
