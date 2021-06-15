import { baseApiUri } from './common'

/**
 * Return URI for site metadata
 */
export function info() {
  return baseApiUri()
}

/**
 * Return URI for site metadata
 */
export function resources() {
  return baseApiUri()
}

/**
 * Return URI for site context information
 */
export function contextInfo() {
  return '/_api/ContextInfo'
}

/**
 * Return URI for site's parent info
 */
export function parentSite() {
  return `${baseApiUri()}/ParentWeb`
}

/**
 * Return URI for site's recycle bin
 */
export function recycleBin() {
  return `${baseApiUri()}/RecycleBin`
}

/**
 * Return URI for site regional settings
 */
export function regionalSettings() {
  return `${baseApiUri()}/RegionalSettings`
}
