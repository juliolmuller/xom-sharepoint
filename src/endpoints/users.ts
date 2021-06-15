import { baseApiUri } from './common'
import stringifyQuery from '../utils/stringifyQuery'

import type { XomApiQueryString } from '../types'

/**
 * Return URI to get basic information for current user
 */
export function current() {
  return `${baseApiUri()}/CurrentUser`
}

/**
 * Return URI to get users list metadata
 */
export function listMetadata() {
  return `${baseApiUri()}/SiteUserInfoList`
}

/**
 * Return URI to get users list fields
 */
export function listFields(query?: XomApiQueryString) {
  return `${listMetadata()}/Fields${stringifyQuery(query)}`
}

/**
 * Return URI to get users records
 */
export function listItems(query?: XomApiQueryString) {
  return `${listMetadata()}/Items${stringifyQuery(query)}`
}

/**
 * Return URI to get a given user information
 */
export function byId(id: number) {
  return `${listMetadata()}/Items(${id})`
}
