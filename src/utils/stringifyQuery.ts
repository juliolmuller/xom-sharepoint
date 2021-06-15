import qs from 'querystring'

import type { XomApiQueryString } from '../types'

/**
 * Converts possible query string inputs into
 */
function stringifyQuery(query: XomApiQueryString | undefined) {
  if (!query) {
    return ''
  }

  if (typeof query === 'string') {
    return (query[0] === '$' ? `?${query}` : query)
  }

  return `?${qs.stringify(query)}`
}

export default stringifyQuery
