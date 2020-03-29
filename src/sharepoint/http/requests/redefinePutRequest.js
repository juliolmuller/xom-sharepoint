
/**
 * Redefine axios' PUT request
 *
 * @param {Axios} axiosInstance
 */
module.exports = function redefinePutRequest(axiosInstance) {
  axiosInstance.put = function(url, data, config) {
    config = config || {}
    config.headers = config.headers || {
      ...this.defaults.headers.common,
      'X-Http-Method': 'MERGE',
      'If-Match': '*',
    }

    if (config.digest) {
      config.headers['X-RequestDigest'] = config.digest
      config.headers['X-Http-Method'] = 'PUT'
      delete config.digest
    }

    return new Promise((resolve) => {
      this.post(url, data, config).then((response) => {
        this.get(url).then(({ data }) => {
          response.data = data
          resolve(response)
        })
      })
    })
  }
}
