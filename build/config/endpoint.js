"use strict";

/**
 * Group of functions to get SharePoint API URI endpoints
 */
module.exports = {
  /**
   * Return URI for site metadata
   *
   * @return {string}
   */
  siteInfo: function siteInfo() {
    return '/_api/web';
  },

  /**
   * Return URI for site context information
   *
   * @return {string}
   */
  contextInfo: function contextInfo() {
    return '/_api/ContextInfo';
  },

  /**
   * Return URI to get a user information
   *
   * @param {number} userId
   * @return {string}
   */
  user: function user(userId) {
    return "/_api/Web/GetUserById(".concat(userId, ")");
  },

  /**
   * Return URI to get additional user information
   *
   * @return {string}
   */
  userInfo: function userInfo() {
    return '/_vti_bin/listdata.svc/UserInformationList';
  },

  /**
   * Return URI to get current user information
   *
   * @return {string}
   */
  currentUser: function currentUser() {
    return '/_api/web/CurrentUser';
  },

  /**
   * Return URI to get additional current user information
   *
   * @return {string}
   */
  currentUserInfo: function currentUserInfo() {
    return '/_api/SP.UserProfiles.PeopleManager/GetMyProperties';
  },

  /**
   * Return URI tfor site resources/lists index
   *
   * @return {string}
   */
  resourcesIndex: function resourcesIndex() {
    return '/_api/lists';
  },

  /**
   * Return URI to touch a list
   *
   * @param {string} listTitle
   * @return {string}
   */
  list: function list(listTitle) {
    return "/_api/web/lists/getByTitle('".concat(listTitle, "')");
  },

  /**
   * Return URI to list fields and their metadata
   *
   * @param {string} listTitle
   * @return {string}
   */
  listFields: function listFields(listTitle) {
    return "/_api/web/lists/getByTitle('".concat(listTitle, "')/fields");
  },

  /**
   * Return URI to handle list items
   *
   * @param {string} listUri
   * @return {string}
   */
  listItems: function listItems(listUri) {
    return "/_vti_bin/listdata.svc/".concat(listUri);
  },

  /**
   * Return URI to handle list items attachments
   *
   * @param {string} listTitle
   * @param {number} itemId
   * @return {string}
   */
  listItemsAttachment: function listItemsAttachment(listTitle, itemId) {
    return "/_api/web/lists/getByTitle('".concat(listTitle, "')/items(").concat(itemId, ")/AttachmentFiles");
  },

  /**
   * Return URI to access resources by relative URL
   *
   * @param {string} relativeUrl
   * @return {string}
   */
  serverResource: function serverResource(relativeUrl) {
    return "/_api/web/getFileByServerRelativeUrl('".concat(relativeUrl, "')");
  }
};