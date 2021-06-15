import axios from 'axios'
import * as requests from '../facades/requests'
import commonHeaders from './config/commonHeaders'
import reqTransformers from './transformers/request'
import respTransformers from './transformers/response'
import requestInterceptors from './interceptors/request'
import responseInterceptors from './interceptors/response'
import registerInterceptor from '../utils/registerInterceptor'

import type { XomApiClient } from '../types'

function httpFactory(siteUrl: string): XomApiClient {
  const http: XomApiClient = axios.create({
    headers: commonHeaders,
    baseURL: siteUrl || '/',
    withCredentials: true,
    transformRequest: reqTransformers,
    transformResponse: respTransformers,
  })

  requestInterceptors.forEach(registerInterceptor(http, 'request'))
  responseInterceptors.forEach(registerInterceptor(http, 'response'))

  http.defaults.requestDigest = requests.getRequestDigest(http)

  return http
}

export default httpFactory
