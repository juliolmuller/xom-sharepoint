const http = require('./axios-instance')
const reqTransformers = require('./transformers/request')
const respTransformers = require('./transformers/response')
const reqInterceptors = require('./interceptors/request')
const respInterceptors = require('./interceptors/response')

/**
 * Configure the custom instance of axios and provide it
 *
 * @param {string} [siteUrl] If no URL is provided, current site's will be used
 * @return {Axios}
 */
module.exports = function(siteUrl) {

  // Set base URL for requests
  http.defaults.baseURL = siteUrl || (() => {
    const delimiters = new RegExp([
      '/lists/', '/folders/', '/_layouts/',
      '/_api/', '/_vti_bin/', '/sitepages/',
    ].join('|'))
    return window.location.href.toLowerCase().split(delimiters)[0]
  })()

  // Set data transformers
  http.defaults.transformRequest = reqTransformers
  http.defaults.transformResponse = respTransformers

  // Set interceptors
  reqInterceptors.forEach((intc) => http.interceptors.request.use(...intc))
  respInterceptors.forEach((intc) => http.interceptors.response.use(...intc))

  return http
}
