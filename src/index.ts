import XomSharePointSite from './XomSharePointSite'

/**
 * Instantiate a XomSharePoint object to connect to a SharePoint site and,
 * therefore, exchange data with its contents (lists, libraries, permissions)
 * through SharePoint native REST API
 */
export default function xomSharePoint(baseSiteUrl: string): XomSharePointSite {
  return new XomSharePointSite(baseSiteUrl)
}
