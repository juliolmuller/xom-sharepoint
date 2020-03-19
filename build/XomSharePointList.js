"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toPascalCase = require('./utils/toPascalCase');

var uri = require('./config/constants');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {string} listName Base URL of the SharePoint site to connect to
 * @param {Axios} axiosInstance The Axios instance to beused to perform HTTP
 * '                            requests
 */


module.exports = function XomSharePointList(listName, axiosInstance) {
  /**
   * Ensure pointer to propper 'this'
   *
   * @private
   * @final
   * @var {this}
   */
  var _this = this;
  /**
   * Store the SharePoint list name
   *
   * @private
   * @var {string}
   */


  var _listName = listName;
  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */

  var _http = axiosInstance;
  /**
   * Define property to get & set 'siteUrl' value
   *
   * @property {string} siteUrl
   */

  Object.defineProperty(_this, 'siteUrl', {
    get: function get() {
      return _http.defaults.apiUri;
    },
    set: function set(siteUrl) {
      _http.defaults.apiUri = siteUrl;
    }
  });
  /**
   * Define property to get & set 'listName' value
   *
   * @property {string} listName
   */

  Object.defineProperty(_this, 'listName', {
    get: function get() {
      return toPascalCase(_listName);
    },
    set: function set(listName) {
      _listName = listName;
    }
  });
  /**
   * Define property to get 'apiUri' value
   *
   * @property {string} apiUri
   */

  Object.defineProperty(_this, 'apiUri', {
    get: function get() {
      return "".concat(uri.API_URI_LIST, "/").concat(_this.listName);
    }
  });
  /**
   * Define property to get 'apiUriAttachment' value
   *
   * @property {string} apiUriAttachment
   */

  Object.defineProperty(_this, 'apiUriAttachment', {
    get: function get() {
      return "".concat(uri.API_URI_LIST_ATTACH, "(").concat(_this.listName, ")");
    }
  });
  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {string} [params] Parameters to be appended to the requested URL.
   *                          See https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * @return {Promise}
   */

  _this.get = function (params) {
    return new Promise(function (resolve, reject) {
      _http.get(_this.apiUri + (params || '')).then(function (response) {
        return resolve(response.data.d.results || response.data.d);
      })["catch"](function (error) {
        return reject(error);
      });
    });
  };
  /**
   * Perform a GET request to API to obtain a single record based on its ID
   *
   * @param {number} id Identification number for the record to be retrieved
   * @return {Promise}
   */


  _this.getOne = function (id) {
    return new Promise(function (resolve, reject) {
      _http.get(_this.apiUri + "(".concat(id, ")")).then(function (response) {
        return resolve(response.data.d);
      })["catch"](function (error) {
        return reject(error);
      });
    });
  };
  /**
   * Performs a POST request to API to store a new record
   *
   * @param {Object} data The object (using JSON notation) to be saved
   * @return {Promise}
   */


  _this.post = function (data) {
    return new Promise(function (resolve, reject) {
      _http.post(_this.apiUri, data).then(function (response) {
        return resolve(response.data.d.results);
      })["catch"](function (error) {
        return reject(error);
      });
    });
  };
  /**
   * Perform a POST request (with MERGE header) to API to update an existing record based on its ID
   *
   * @param {number} id Identification number for the record to be modified
   * @param {Object} data The object (using JSON notation) to be changed
   * @return {Promise}
   */


  _this.update = function (id, data) {
    return _http.post(_this.apiUri + "(".concat(id, ")"), data, {
      headers: _objectSpread({}, _http.defaults.headers.common, {
        'X-Http-Method': 'MERGE',
        'If-Match': '*'
      })
    });
  };
  /**
   * Perform a POST request (with DELETE header) to API delete an existing record
   *
   * @param {number} id Identification number for the record to be deleted
   * @return {Promise}
   */


  _this["delete"] = function (id) {
    return _http.post(_this.apiUri + "(".concat(id, ")"), {}, {
      headers: _objectSpread({}, _http.defaults.headers.common, {
        'X-Http-Method': 'DELETE',
        'If-Match': '*'
      })
    });
  };
};