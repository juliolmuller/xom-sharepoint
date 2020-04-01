
/**
 * Redefine axios' PUT request
 *
 * @param {Axios} axiosInstance
 */
module.exports = function redefinePutRequest(axiosInstance) {
  axiosInstance.put = async function(url, data, config) {
    config = config || {}
    config.headers = config.headers || {
      ...this.defaults.headers.common,
      'X-Http-Method': config.requestDigest ? 'PUT ' : 'MERGE',
      'If-Match': '*',
    }

    const putResponse = await this.post(url, data, config)
    const getResponse = config.requestDigest
      ? { data: { Success: true, Error: false } }
      : await this.get(url)
    putResponse.data = getResponse.data

    return putResponse
  }
}
