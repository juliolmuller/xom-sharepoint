"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var axios = require('axios')["default"];

var endpoint = require('./config/endpoint');

var XomSharePointList = require('./XomSharePointList');

var XomSharePointSurvey = require('./XomSharePointSurvey');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * team site through its REST API
 *
 * @constructor
 * @param {string} baseSiteUrl Base URL of the SharePoint site to connect to
 */


module.exports = function XomSharePoint(baseSiteUrl) {
  /**
   * Ensure pointer to propper 'this'
   *
   * @private
   * @final
   * @var {this}
   */
  var _this = this;
  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */


  var _http = axios.create(); // Default HTTP client configurations


  _http.defaults.withCredentials = true;
  _http.defaults.baseURL = baseSiteUrl;
  _http.defaults.headers.common = {
    'Accept': 'application/json;odata=verbose',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json;odata=verbose'
  };
  /**
   * Define property to get & set 'baseUrl' value
   *
   * @property {string} baseUrl
   */

  Object.defineProperty(_this, 'baseUrl', {
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
    return String(account).replace(/(.*)[\|](.*)/, '$2').replace(/\\/, '_');
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
  };
  /**
   * Get the SharePoint site metadata
   *
   * @return {Promise}
   */


  _this.getInfo = function () {
    return new Promise(function (resolve, reject) {
      _http.get(endpoint.siteInfo()).then(function (response) {
        return resolve(response.data.d);
      })["catch"](reject);
    });
  };
  /**
   * Queries the SharePoint API to grab user information. Inform nothing to get
   * current user information or pass an specific user ID
   *
   * @param {number} [id] ID of the user you want the information for
   * @return {Promise}
   */


  _this.getUserInfo = function (id) {
    if (!id) {
      return _this.getMyInfo();
    }

    return new Promise(function (resolve, reject) {
      _http.get("".concat(endpoint.userInfo(), "?$top=1")).then(function (response) {
        var idField = response.data.d[0].Id ? 'Id' : 'Id0';
        var requests = [_http.get(endpoint.user(id)), _http.get("".concat(endpoint.userInfo(), "?$filter=(").concat(idField, " eq ").concat(id, ")"))];
        Promise.all(requests).then(function (responses) {
          var mergedAttr = _objectSpread({}, responses[0].data.d, {}, responses[1].data.d.results[0]);

          addUserProperties(mergedAttr);
          resolve(mergedAttr);
        })["catch"](function (error) {
          return reject(error);
        });
      })["catch"](reject);
    });
  };

  _this.getMyInfo = function () {
    var requests = [_http.get(endpoint.currentUser()), _http.get(endpoint.currentUserInfo())];
    return new Promise(function (resolve, reject) {
      Promise.all(requests).then(function (responses) {
        var mergedAttr = _objectSpread({}, responses[0].data.d, {}, responses[1].data.d);

        addUserProperties(mergedAttr);
        resolve(mergedAttr);
      })["catch"](reject);
    });
  };
  /**
   * Queries SharePoint API searching for user name
   *
   * @param {string} name Partial name of the user
   * @return {Promise}
   */


  _this.searchUser = function (name) {
    return new Promise(function (resolve, reject) {
      _http.get("".concat(endpoint.userInfo(), "?$filter=substringof('").concat(name, "',Name)")).then(function (response) {
        return resolve(response.data.d.results);
      })["catch"](reject);
    });
  };
  /**
   * Return an array with all the resources stored in the site (lists)
   *
   * @return {Promise}
   */


  _this.getResources = function () {
    return new Promise(function (resolve, reject) {
      _http.get(endpoint.resourcesIndex()).then(function (response) {
        return resolve(response.data.d.results || response.data.d);
      })["catch"](reject);
    });
  };
  /**
   * Return a reference to connect to a SharePoint list
   *
   * @param {string} listTitle SharePoint list title
   * @return {XomSharePointList}
   */


  _this.getList = function (listTitle) {
    return new XomSharePointList(listTitle, _http);
  };
  /**
   * Return a reference to connect to a SharePoint survey
   *
   * @param {string} surveyTitle SharePoint survey title
   * @return {XomSharePointList}
   */


  _this.getSurvey = function (surveyTitle) {
    return new XomSharePointSurvey(surveyTitle, _http);
  };
};