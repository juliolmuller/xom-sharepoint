
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
      'X-Http-Method': config.digest ? 'PUT ' : 'MERGE',
      'If-Match': '*',
    }

    if (config.digest) {
      return this.post(url, data, config)
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
