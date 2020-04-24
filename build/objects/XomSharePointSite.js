"use strict";

/* eslint-disable arrow-body-style */

/* eslint-disable no-underscore-dangle */
var requests = require('../facades/requests');

var httpFactory = require('../http/http-factory');

var XomSharePointList = require('./XomSharePointList');

var XomSharePointSurvey = require('./XomSharePointSurvey');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * site through its REST API
 *
 * @constructor
 * @param {String} [baseSiteUrl] Base URL for the SharePoint site to connect to.
 *                               If none URL is provided, the instance will assume
 *                               the current site/subsite
 */


module.exports = function XomSharePointSite(baseSiteUrl) {
  /**
   * Base custom instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */
  var _http = httpFactory(baseSiteUrl);
  /**
   * Eagerly store current user data (as Promise)
   *
   * @private
   * @final
   * @var {Promise<Object>}
   */


  var _currUser = requests.getSiteCurrentUser(_http).then(function (_ref) {
    var Id = _ref.Id;
    return requests.getSiteUserById(_http, Id);
  });
  /**
   * Define property to get & set 'baseUrl' value
   *
   * @property {String} baseUrl
   */


  Object.defineProperty(this, 'baseUrl', {
    get: function get() {
      return _http.defaults.baseURL;
    },
    set: function set(baseUrl) {
      _http.defaults.baseURL = baseUrl;
    }
  });
  /**
   * Get the SharePoint site metadata
   *
   * @return {Promise}
   */

  this.getInfo = function () {
    return requests.getSite(_http);
  };
  /**
   * Queries the SharePoint API to get user information. Inform nothing to get
   * current user information or pass an specific user ID
   *
   * @param {Number} [id] ID of the user you want the information for
   * @return {Promise}
   */


  this.getUserInfo = function (id) {
    if (id) {
      return requests.getSiteUserById(_http, id);
    }

    return _currUser;
  };
  /**
   * Queries SharePoint API searching for user name
   *
   * @param {String} search Partial name/userID of the user
   * @return {Promise}
   */


  this.searchUser = function (search) {
    return requests.getSiteUsersListItems(_http, "?$filter=substringof('".concat(search, "',Title) or substringof('").concat(search, "',UserName)"));
  };
  /**
   * Return a reference to connect to a SharePoint list
   *
   * @param {String} listTitle SharePoint list title
   * @return {XomSharePointList}
   */


  this.getList = function (listTitle) {
    return new XomSharePointList(listTitle, _http);
  };
  /**
   * Create a new SharePoint list
   *
   * @param {String} listTitle SharePoint list title
   * @return {Promise}
   */


  this.createList = function (listTitle) {
    return requests.createList(_http, listTitle);
  };
  /**
   * Delete an existing SharePoint list
   *
   * @param {String} listTitle SharePoint list title
   * @return {Promise}
   */


  this.deleteList = function (listTitle) {
    return requests.deleteList(_http, listTitle);
  };
  /**
   * Return a reference to connect to a SharePoint survey
   *
   * @param {String} surveyTitle SharePoint survey title
   * @return {XomSharePointSurvey}
   */


  this.getSurvey = function (surveyTitle) {
    return new XomSharePointSurvey(surveyTitle, _http);
  };
};