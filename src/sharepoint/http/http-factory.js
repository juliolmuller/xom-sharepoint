const axios = require('axios').default
const reqTransformers = require('./transformers/request')
const respTransformers = require('./transformers/response')
const requestInterceptors = require('./interceptors/request')
const responseInterceptors = require('./interceptors/response')
const { getRequestDigest } = require('../facades/requests')

/**
 * Create and configure the custom instance of axios and provide it
 *
 * @param {string} [siteUrl] If no URL is provided, current site's will be used
 * @return {Axios}
 */
module.exports = function(siteUrl) {

  // Create a new axios instance
  const http = axios.create()

  // Set base URL for requests
  http.defaults.baseURL = siteUrl || (() => {
    const delimiters = new RegExp([
      '/lists/', '/folders/', '/_layouts/',
      '/_api/', '/_vti_bin/', '/sitepages/',
    ].join('|'))
    return window.location.href.toLowerCase().split(delimiters)[0]
  })()

  // Set request transformers and interceptors
  http.defaults.transformRequest = reqTransformers
  requestInterceptors.forEach((intc) => {
    return http.interceptors.request
      .use(...(intc.constructor === Function ? intc(http) : intc))
  })

  // Set response transformers and interceptors
  http.defaults.transformResponse = respTransformers
  responseInterceptors.forEach((intc) => {
    return http.interceptors.response
      .use(...(intc.constructor === Function ? intc(http) : intc))
  })

  // Eagerly get request digest
  http.defaults.requestDigest = getRequestDigest(http)

  return http
}
