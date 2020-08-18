import axios from 'axios'
import reqTransformers from './transformers/request'
import respTransformers from './transformers/response'
import requestInterceptors from './interceptors/request'
import responseInterceptors from './interceptors/response'
import requests from '../facades/requests'

/**
 * Create and configure the custom instance of axios and provide it
 *
 * @param {String} siteUrl If no URL is provided, current site's will be used
 * @return {Axios}
 */
export default (siteUrl) => {

  const http = axios.create()

  http.defaults.baseURL = siteUrl || '/'

  http.defaults.transformRequest = reqTransformers
  requestInterceptors.forEach((intc) => http.interceptors.request
    .use(...(intc.constructor === Function ? intc(http) : intc)))
  http.defaults.transformResponse = respTransformers
  responseInterceptors.forEach((intc) => http.interceptors.response
    .use(...(intc.constructor === Function ? intc(http) : intc)))

  http.defaults.requestDigest = requests.getRequestDigest(http)

  return http
}
