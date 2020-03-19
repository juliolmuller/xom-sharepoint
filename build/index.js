"use strict";

var XomSharePoint = require('./XomSharePoint');
/**
 * Instantiate a XomSharePoint object to connect to a SharePoint site and,
 * therefore, exchange data with its contents (lists, libraries, permissions)
 * through SharePoint native REST API
 *
 * @version 0.5.0
 * @param {string} siteUrl Base URL of the SharePoint site to connect to
 * @return {XomSharePoint}
 */


module.exports = function xomFactory(siteUrl) {
  return new XomSharePoint(siteUrl);
};