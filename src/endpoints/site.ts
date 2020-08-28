import { baseApiUri } from './common'

/**
 * Return URI for site metadata
 */
export function info(): string {
  return baseApiUri()
}

/**
 * Return URI for site metadata
 */
export function resources(): string {
  return baseApiUri()
}

/**
 * Return URI for site context information
 */
export function contextInfo(): string {
  return '/_api/ContextInfo'
}

/**
 * Return URI for site's parent info
 */
export function parentSite(): string {
  return `${baseApiUri()}/ParentWeb`
}

/**
 * Return URI for site's recycle bin
 */
export function recycleBin(): string {
  return `${baseApiUri()}/RecycleBin`
}

/**
 * Return URI for site regional settings
 */
export function regionalSettings(): string {
  return `${baseApiUri()}/RegionalSettings`
}
