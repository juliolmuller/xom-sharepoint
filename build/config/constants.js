"use strict";

module.exports = {
  /**
   * Return the API URI to get user information
   *
   * @const {string}
   */
  API_USER: '/_api/Web/GetUserById',

  /**
   * Return the API URI to get additional user information
   *
   * @const {string}
   */
  API_USER_INFO: '/_vti_bin/listdata.svc/UserInformationList',

  /**
   * Return the API URI to get current user information
   *
   * @const {string}
   */
  API_USER_SELF: '/_api/web/CurrentUser',

  /**
   * Return the API URI to get additional current user information
   *
   * @const {string}
   */
  API_USER_SELF_INFO: '/_api/SP.UserProfiles.PeopleManager/GetMyProperties',

  /**
   * Return the API URI to fetch SharePoint lists
   *
   * @const {string}
   */
  API_URI_LIST: '/_vti_bin/listdata.svc',

  /**
   * Return the API URI to fetch SharePoint lists attachments
   *
   * @const {string}
   */
  API_URI_LIST_ATTACH: '/_api/web/lists/getbytitle'
};