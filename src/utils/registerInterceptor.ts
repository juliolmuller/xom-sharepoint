import { XomApiClient } from '../@types'

/**
 * Register the interceptors in the XomApiClient instance.
 */
function registerInterceptor(http: XomApiClient, at: 'request' | 'response') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (events: any): void => {
    const isFunction = typeof events === 'function'
    const interceptionEvents = isFunction ? events(http) : events

    http.interceptors[at].use(...interceptionEvents)
  }
}

export default registerInterceptor
