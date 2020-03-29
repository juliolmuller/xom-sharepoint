"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var endpoint = require('../config/endpoint');

var httpFactory = require('../http/xomHttpFactory');

var XomSharePointList = require('./XomSharePointList');

var XomSharePointSurvey = require('./XomSharePointSurvey');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * site through its REST API
 *
 * @constructor
 * @param {string} [baseSiteUrl] Base URL for the SharePoint site to connect to.
 *                               If none URL is provided, the instance will assume
 *                               the current site/subsite
 */


module.exports = function XomSharePoint(baseSiteUrl) {
  var _this = this;

  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */
  var _http = httpFactory(baseSiteUrl);
  /**
   * Define property to get & set 'baseUrl' value
   *
   * @property {string} baseUrl
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
   * Extract useful parts of account/login name
   *
   * @param {string} account Account/login name to be trimmed
   * @return {string}
   */

  var trimAccount = function trimAccount(account) {
    return String(account).replace(/(.*)[|](.*)/, '$2').replace(/\\/, '_');
  };
  /**
   * Add essential properties to the user object
   *
   * @param {Object} user User object literal
   */


  var addUserProperties = function addUserProperties(user) {
    user.Id = user.Id || user.Id0;
    user.Account = user.LoginName || user.AccountName || user.Account;
    user.AccountName = trimAccount(user.Account);
    user.UserId = user.AccountName.replace(/(.*)[_](.*)/, '$2');
    user.Name = user.Name || user.DisplayName;
    user.PersonalUrl = "https://mysite.na.xom.com/personal//".concat(user.AccountName);
    user.PictureUrl = "http://lyncpictures/service/api/image/".concat(user.AccountName);
    return user;
  };
  /**
   * Get the SharePoint site metadata
   *
   * @return {Promise}
   */


  this.getInfo = function () {
    return _http.get(endpoint.siteInfo());
  };
  /**
   * Queries the SharePoint API to get user information. Inform nothing to get
   * current user information or pass an specific user ID
   *
   * @param {number} [id] ID of the user you want the information for
   * @return {Promise}
   */


  this.getUserInfo = function (id) {
    if (!id) {
      return _this.getMyInfo();
    }

    return _http.get("".concat(endpoint.userInfo(), "?$top=1")).then(function (response) {
      var idField = response.data[0].Id ? 'Id' : 'Id0';
      return Promise.all([_http.get(endpoint.user(id)), _http.get("".concat(endpoint.userInfo(), "?$filter=(").concat(idField, " eq ").concat(id, ")"))]);
    }).then(function (responses) {
      return _objectSpread({}, responses[0], {}, responses[1], {}, {
        data: addUserProperties(_objectSpread({}, responses[0].data, {}, responses[1].data))
      });
    });
  };
  /**
   * Queries the SharePoint API to get current user information
   *
   * @deprecated
   * @return {Promise}
   */


  this.getMyInfo = function () {
    return Promise.all([_http.get(endpoint.currentUser()), _http.get(endpoint.currentUserInfo())]).then(function (responses) {
      return _objectSpread({}, responses[0], {}, responses[1], {}, {
        data: addUserProperties(_objectSpread({}, responses[0].data, {}, responses[1].data))
      });
    });
  };
  /**
   * Queries SharePoint API searching for user name
   *
   * @param {string} name Partial name of the user
   * @return {Promise}
   */


  this.searchUser = function (name) {
    return _http.get("".concat(endpoint.userInfo(), "?$filter=substringof('").concat(name, "',Name)"));
  };
  /**
   * Return an array with all the resources stored in the site (lists)
   *
   * @return {Promise}
   */


  this.getResources = function () {
    return _http.get(endpoint.resourcesIndex());
  };
  /**
   * Return a reference to connect to a SharePoint list
   *
   * @param {string} listTitle SharePoint list title
   * @return {XomSharePointList}
   */


  this.getList = function (listTitle) {
    return new XomSharePointList(listTitle, _http);
  };
  /**
   * Return a reference to connect to a SharePoint survey
   *
   * @param {string} surveyTitle SharePoint survey title
   * @return {XomSharePointList}
   */


  this.getSurvey = function (surveyTitle) {
    return new XomSharePointSurvey(surveyTitle, _http);
  };
};