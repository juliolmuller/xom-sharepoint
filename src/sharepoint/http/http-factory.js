const axios = require('axios').default
const reqTransformers = require('./transformers/request')
const respTransformers = require('./transformers/response')
const requestInterceptors = require('./interceptors/request')
const responseInterceptors = require('./interceptors/response')
const { getRequestDigest } = require('../facades/requests')

/**
 * Create and configure the custom instance of axios and provide it
 *
 * @param {String} [siteUrl] If no URL is provided, current site's will be used
 * @return {Axios}
 */
module.exports = (siteUrl) => {

  const http = axios.create()

  http.defaults.baseURL = siteUrl || (() => {
    const delimiters = new RegExp([
      '/lists/', '/folders/', '/_layouts/',
      '/_api/', '/_vti_bin/', '/sitepages/',
    ].join('|'))
    return window.location.href.toLowerCase().split(delimiters)[0]
  })()

  http.defaults.transformRequest = reqTransformers
  requestInterceptors.forEach((intc) => http.interceptors.request
    .use(...(intc.constructor === Function ? intc(http) : intc)))
  http.defaults.transformResponse = respTransformers
  responseInterceptors.forEach((intc) => http.interceptors.response
    .use(...(intc.constructor === Function ? intc(http) : intc)))

  http.defaults.requestDigest = getRequestDigest(http)

  return http
}
