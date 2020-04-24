"use strict";

/**
 * Group of functions to get SharePoint API URI endpoints
 *
 * @const {Object}
 */
var endpoints = {
  site: {},
  users: {},
  lists: {},
  libs: {}
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


endpoints.users.listFields = function () {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(endpoints.users.listMetadata(), "/Fields").concat(query);
};
/**
 * Return URI to get users records
 *
 * @param {String} [query]
 * @return {String}
 */


endpoints.users.listItems = function () {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(endpoints.users.listMetadata(), "/Items").concat(query);
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


endpoints.lists.index = function () {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(endpoints.baseApiUri(), "/Lists").concat(query);
};
/**
 * Return URI to get a given list metadata
 *
 * @param {String} title
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.byTitle = function (title) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "".concat(endpoints.lists.index(), "/GetByTitle('").concat(title, "')").concat(query);
};
/**
 * Return URI to get a given list fields
 *
 * @param {String} title
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.fields = function (title) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "".concat(endpoints.lists.byTitle(title), "/Fields").concat(query);
};
/**
 * Return URI to get a given list items
 *
 * @param {String} title
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.items = function (title) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "".concat(endpoints.lists.byTitle(title), "/Items").concat(query);
};
/**
 * Return URI to get an specific list item
 *
 * @param {String} title
 * @param {Number} itemId
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.itemById = function (title, itemId) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return endpoints.lists.items(title, "(".concat(itemId, ")").concat(query));
};
/**
 * Return URI to handle list items attachments
 *
 * @param {String} title
 * @param {Number} itemId
 * @return {String}
 */


endpoints.lists.itemAttachments = function (title, itemId) {
  return "".concat(endpoints.lists.itemById(title, itemId), "/AttachmentFiles");
};
/**
 * Return URI to handle list items attachments
 *
 * @param {String} title
 * @param {Number} itemId
 * @param {String} fileName
 * @return {String}
 */


endpoints.lists.itemAttachmentByName = function (title, itemId, fileName) {
  return "".concat(endpoints.lists.itemById(title, itemId), "/AttachmentFiles/GetByFileName('").concat(fileName, "')");
};
/**
 * Return URI to handle upload of list items attachments
 *
 * @param {String} title
 * @param {Number} itemId
 * @param {String} fileName
 * @return {String}
 */


endpoints.lists.itemAttachmentsUpload = function (title, itemId, fileName) {
  return "".concat(endpoints.lists.itemAttachments(title, itemId), "/Add(filename='").concat(fileName, "')");
};
/**
 * Return URI to handle renaming of list items attachments
 *
 * @param {String} oldFileUrl
 * @param {String} newFileUrl
 * @return {String}
 */


endpoints.lists.itemAttachmentsRename = function (oldFileUrl, newFileUrl) {
  return "".concat(endpoints.libs.fileByUrl(oldFileUrl), "/MoveTo(newurl='").concat(newFileUrl, "',flags=1)");
};
/**
 * Return URI for all the libraries
 *
 * @param {String} [query]
 * @return {String}
 */


endpoints.libs.index = function () {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(endpoints.baseApiUri(), "/Folders").concat(query);
};
/**
 * Return URI to access folder by relative URL
 *
 * @param {String} relativeUrl
 * @return {String}
 */


endpoints.libs.folderByUrl = function (relativeUrl) {
  return "".concat(endpoints.baseApiUri(), "/GetFolderByServerRelativeUrl('").concat(relativeUrl, "}')");
};
/**
 * Return URI to access files by relative URL
 *
 * @param {String} relativeUrl
 * @return {String}
 */


endpoints.libs.fileByUrl = function (relativeUrl) {
  return "".concat(endpoints.baseApiUri(), "/GetFileByServerRelativeUrl('").concat(relativeUrl, "')");
};

module.exports = endpoints;