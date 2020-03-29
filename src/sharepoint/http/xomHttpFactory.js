const axios = require('axios')
const redefineDeleteRequest = require('./requests/redefineDeleteRequest')
const redefinePutRequest = require('./requests/redefinePutRequest')
const setDefaultHeaders = require('./requests/setDefaultHeaders')
const convertResponseDates = require('./transform/convertResponseDates')
const extractResponseData = require('./transform/extractResponseData')

/**
 * Create a custom instance of axios
 *
 * @param {string} [siteUrl] If no URL is provided, current site's will be used
 * @return {Axios}
 */
module.exports = function xomHttpFactory(siteUrl) {

  const http = axios.create()

  // Define request defaults
  http.defaults.baseURL = siteUrl || (() => {
    const delimiters = new RegExp([
      '/lists/', '/folders/', '/_layouts/',
      '_api', '/_vti_bin/',
    ].join('|'))
    return window.location.href.toLowerCase().split(delimiters)[0]
  })()

  // Define default headers
  setDefaultHeaders(http)

  // Redefine methods to perform requests
  redefineDeleteRequest(http)
  redefinePutRequest(http)

  // Define response transformation
  http.defaults.transformResponse = [
    ...http.defaults.transformResponse,
    extractResponseData,
    convertResponseDates,
  ]

  return http
}
