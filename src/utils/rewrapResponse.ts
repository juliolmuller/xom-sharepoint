import type { AxiosResponse } from 'axios'
import type { XomApiResponse } from '../types'

/**
 * Taxes an AxiosResponse and rewrap it as a XomApiRawResponse object.
 */
function rewrapResponse(response: AxiosResponse): XomApiResponse {
  const { data, ...metadata } = response
  const newResponse = data || {}

  Object.defineProperty(newResponse, '__response', {
    value: metadata,
    writable: true,
  })

  return newResponse
}

export default rewrapResponse
