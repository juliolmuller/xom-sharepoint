"use strict";

var qs = require('querystring');
/**
 * Function to easily convert an object into a query string
 *
 * @param {any} query
 */


var stringify = function stringify(query) {
  if (!query) {
    return '';
  }

  if (typeof query === 'string') {
    return query[0] === '$' ? "?".concat(query) : query;
  }

  return "?".concat(qs.stringify(query));
};
/**
 * Group of functions to get SharePoint API URI endpoints
 *
 * @const {Object}
 */


var endpoints = {
  site: {},
  users: {},
  lists: {},
  folders: {}
};
/**
 * Return the base API URI
 *
 * @return {String}
 */

endpoints.baseApiUri = function () {
  return '/_api/web';
};
/**
 * Return URI for site metadata
 *
 * @return {String}
 */


endpoints.site.info = function () {
  return endpoints.baseApiUri();
};
/**
 * Return URI for site metadata
 *
 * @return {String}
 */


endpoints.site.resources = function () {
  return endpoints.baseApiUri();
};
/**
 * Return URI for site context information
 *
 * @return {String}
 */


endpoints.site.contextInfo = function () {
  return '/_api/ContextInfo';
};
/**
 * Return URI for site's parent info
 *
 * @return {String}
 */


endpoints.site.parentSite = function () {
  return "".concat(endpoints.baseApiUri(), "/ParentWeb");
};
/**
 * Return URI for site's recycle bin
 *
 * @return {String}
 */


endpoints.site.recycleBin = function () {
  return "".concat(endpoints.baseApiUri(), "/RecycleBin");
};
/**
 * Return URI for site regional settings
 *
 * @return {String}
 */


endpoints.site.regionalSettings = function () {
  return "".concat(endpoints.baseApiUri(), "/RegionalSettings");
};
/**
 * Return URI to get basic information for current user
 *
 * @return {String}
 */


endpoints.users.current = function () {
  return "".concat(endpoints.baseApiUri(), "/CurrentUser");
};
/**
 * Return URI to get users list metadata
 *
 * @return {String}
 */


endpoints.users.listMetadata = function () {
  return "".concat(endpoints.baseApiUri(), "/SiteUserInfoList");
};
/**
 * Return URI to get users list fields
 *
 * @param {String} [query]
 * @return {String}
 */


endpoints.users.listFields = function (query) {
  return "".concat(endpoints.users.listMetadata(), "/Fields").concat(stringify(query));
};
/**
 * Return URI to get users records
 *
 * @param {String} [query]
 * @return {String}
 */


endpoints.users.listItems = function (query) {
  return "".concat(endpoints.users.listMetadata(), "/Items").concat(stringify(query));
};
/**
 * Return URI to get a given user information
 *
 * @param {Number} id
 * @return {String}
 */


endpoints.users.byId = function (id) {
  return "".concat(endpoints.users.listMetadata(), "/Items(").concat(id, ")");
};
/**
 * Return URI to get aall lists metadata
 *
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.index = function (query) {
  return "".concat(endpoints.baseApiUri(), "/Lists").concat(stringify(query));
};
/**
 * Return URI to get a given list metadata
 *
 * @param {String} listTitle
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.byTitle = function (listTitle, query) {
  return "".concat(endpoints.lists.index(), "/GetByTitle('").concat(listTitle, "')").concat(stringify(query));
};
/**
 * Return URI to get a given list fields
 *
 * @param {String} listTitle
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.fields = function (listTitle, query) {
  return "".concat(endpoints.lists.byTitle(listTitle), "/Fields").concat(stringify(query));
};
/**
 * Return URI to get a given list items
 *
 * @param {String} listTitle
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.items = function (listTitle, query) {
  return "".concat(endpoints.lists.byTitle(listTitle), "/Items").concat(stringify(query));
};
/**
 * Return URI to get an specific list item
 *
 * @param {String} listTitle
 * @param {Number} itemId
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.itemById = function (listTitle, itemId, query) {
  return endpoints.lists.items(listTitle, "(".concat(itemId, ")").concat(stringify(query)));
};
/**
 * Return URI to handle list items attachments
 *
 * @param {String} listTitle
 * @param {Number} itemId
 * @return {String}
 */


endpoints.lists.itemAttachments = function (listTitle, itemId) {
  return "".concat(endpoints.lists.itemById(listTitle, itemId), "/AttachmentFiles");
};
/**
 * Return URI to handle list items attachments
 *
 * @param {String} listTitle
 * @param {Number} itemId
 * @param {String} fileName
 * @return {String}
 */


endpoints.lists.itemAttachmentByName = function (listTitle, itemId, fileName) {
  return "".concat(endpoints.lists.itemById(listTitle, itemId), "/AttachmentFiles/GetByFileName('").concat(fileName, "')");
};
/**
 * Return URI to handle upload of list items attachments
 *
 * @param {String} listTitle
 * @param {Number} itemId
 * @param {String} fileName
 * @return {String}
 */


endpoints.lists.itemAttachmentsUpload = function (listTitle, itemId, fileName) {
  return "".concat(endpoints.lists.itemAttachments(listTitle, itemId), "/Add(filename='").concat(fileName, "')");
};
/**
 * Return URI to handle renaming of list items attachments
 *
 * @param {String} oldFileUrl
 * @param {String} newFileUrl
 * @return {String}
 */


endpoints.lists.itemAttachmentsRename = function (oldFileUrl, newFileUrl) {
  return "".concat(endpoints.folders.fileByUrl(oldFileUrl), "/MoveTo(newurl='").concat(newFileUrl, "',flags=1)");
};
/**
 * Return URI for all the libraries
 *
 * @param {String} [query]
 * @return {String}
 */


endpoints.folders.index = function (query) {
  return "".concat(endpoints.baseApiUri(), "/Folders").concat(stringify(query));
};
/**
 * Return URI to access folder by relative URL
 *
 * @param {String} relativeUrl
 * @return {String}
 */


endpoints.folders.folderByUrl = function (relativeUrl) {
  return "".concat(endpoints.baseApiUri(), "/GetFolderByServerRelativeUrl('").concat(relativeUrl, "')");
};
/**
 * Return URL to list of folders within a given folder
 *
 * @param {String} relativeUrl
 * @param {String} [query]
 * @return {String}
 */


endpoints.folders.foldersInFolder = function (relativeUrl, query) {
  return "".concat(endpoints.folders.folderByUrl(relativeUrl), "/Folders").concat(stringify(query));
};
/**
 * Return URL to list of files within a given folder
 *
 * @param {String} relativeUrl
 * @param {String} [query]
 * @return {String}
 */


endpoints.folders.filesInFolder = function (relativeUrl, query) {
  return "".concat(endpoints.folders.folderByUrl(relativeUrl), "/Files").concat(stringify(query));
};
/**
 * Return URL to upload a file to a folder
 *
 * @param {String} relativeUrl
 * @param {String} fileName
 * @param {Boolean} [overwrite]
 * @return {String}
 */


endpoints.folders.newFileToFolder = function (relativeUrl, fileName) {
  var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return "".concat(endpoints.folders.filesInFolder(relativeUrl), "/Add(overwrite=").concat(overwrite, ",url='").concat(fileName, "')");
};
/**
 * Return URI to access files by relative URL
 *
 * @param {String} relativeUrl
 * @return {String}
 */


endpoints.folders.fileByUrl = function (relativeUrl) {
  return "".concat(endpoints.baseApiUri(), "/GetFileByServerRelativeUrl('").concat(relativeUrl, "')");
};

module.exports = endpoints;