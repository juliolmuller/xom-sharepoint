
/**
 * Redefine axios' POST request
 *
 * @param {Axios} axiosInstance
 */
module.exports = function redefinePostRequest(axiosInstance) {
  const _post = axiosInstance.post
  axiosInstance.post = function(url, data, config) {
    config = config || {}
    config.headers = config.headers || this.defaults.headers.common

    if (config.digest) {
      config.headers['X-RequestDigest'] = config.digest
    }

    return _post(url, data, config)
  }
}
