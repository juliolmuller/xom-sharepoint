import { XomApiQueryString } from '../@types'
import { baseApiUri } from './common'
import stringifyQuery from '../utils/stringifyQuery'

/**
 * Return URI to get basic information for current user
 */
export function current(): string {
  return `${baseApiUri()}/CurrentUser`
}

/**
 * Return URI to get users list metadata
 */
export function listMetadata(): string {
  return `${baseApiUri()}/SiteUserInfoList`
}

/**
 * Return URI to get users list fields
 */
export function listFields(query?: XomApiQueryString): string {
  return `${listMetadata()}/Fields${stringifyQuery(query)}`
}

/**
 * Return URI to get users records
 */
export function listItems(query?: XomApiQueryString): string {
  return `${listMetadata()}/Items${stringifyQuery(query)}`
}

/**
 * Return URI to get a given user information
 */
export function byId(id: number): string {
  return `${listMetadata()}/Items(${id})`
}
