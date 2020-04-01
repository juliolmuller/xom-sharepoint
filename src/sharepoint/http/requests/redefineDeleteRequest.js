
/**
 * Redefine axios' DELETE request
 *
 * @param {Axios} axiosInstance
 */
module.exports = function redefineDeleteRequest(axiosInstance) {
  axiosInstance.delete = async function(url, config) {
    config = config || {}
    config.headers = config.headers || {
      ...this.defaults.headers.common,
      'X-Http-Method': 'DELETE',
      'If-Match': '*',
    }

    const getResponse = config.requestDigest
      ? { data: { Success: true, Error: false } }
      : await this.get(url)
    const delResponse = await this.post(url, {}, config)
    delResponse.data = getResponse.data

    return delResponse
  }
}
