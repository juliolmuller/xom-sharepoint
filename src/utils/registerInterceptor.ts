import type { XomApiClient } from '../types'

/**
 * Register the interceptors in the XomApiClient instance.
 */
function registerInterceptor(http: XomApiClient, at: 'request' | 'response') {
  return (events: any): void => {
    const isFunction = typeof events === 'function'
    const interceptionEvents = isFunction ? events(http) : events

    http.interceptors[at].use(...interceptionEvents)
  }
}

export default registerInterceptor
