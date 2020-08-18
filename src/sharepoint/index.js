import XomSharePointSite from './XomSharePointSite'

/**
 * Instantiate a XomSharePoint object to connect to a SharePoint site and,
 * therefore, exchange data with its contents (lists, libraries, permissions)
 * through SharePoint native REST API
 *
 * @param {string} [baseSiteUrl] Base URL of the SharePoint site to connect to
 * @return {XomSharePoint}
 */
export default (baseSiteUrl) => new XomSharePointSite(baseSiteUrl)
