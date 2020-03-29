
/**
 * Redefine axios' DELETE request
 *
 * @param {Axios} axiosInstance
 */
module.exports = function redefineDeleteRequest(axiosInstance) {
  axiosInstance.delete = function(url, config) {
    config = config || {}
    config.headers = config.headers || {
      ...this.defaults.headers.common,
      'X-Http-Method': 'DELETE',
      'If-Match': '*',
    }

    if (config.digest) {
      return this.post(url, {}, config)
    }

    return new Promise((resolve) => {
      this.get(url).then(({ data }) => {
        this.post(url, {}, config).then((response) => {
          response.data = data
          resolve(response)
        })
      })
    })
  }
}
