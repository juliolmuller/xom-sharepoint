import headers from '../../config/headers-patch'

/**
 * Replace the PATCH method by POST and add the required headers
 *
 * @var {Array<Function>}
 */
export default [

  // on success
  (config) => {

    if ((/patch/i).test(config.method)) {
      config.method = 'post'
      config.headers = headers
    }

    return config
  },
]
