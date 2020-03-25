"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var endpoint = require('./config/endpoint');

var toPascalCase = require('./utils/toPascalCase');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {string} surveyTitle Survey title to connect to
 * @param {Axios} axiosInstance The Axios instance to beused to perform HTTP
 * '                            requests
 */


module.exports = function XomSharePointSurvey(surveyTitle, axiosInstance) {
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


  var _title = surveyTitle;
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
      return _http.defaults.baseURL;
    },
    set: function set(baseUrl) {
      _http.defaults.baseURL = baseUrl;
    }
  });
  /**
   * Define property to get & set 'title' value
   *
   * @property {string} title
   */

  Object.defineProperty(_this, 'title', {
    get: function get() {
      return _title;
    },
    set: function set(listTitle) {
      _title = listTitle;
    }
  });
  /**
   * Define property to get 'name' value
   *
   * @property {string} name
   */

  Object.defineProperty(_this, 'name', {
    get: function get() {
      return toPascalCase(_title);
    }
  });

  _this.getQuestions = function () {
    return new Promise(function (resolve, reject) {
      _http.get("".concat(endpoint.listFields(_this.title), "?$filter=(CanBeDeleted eq true)")).then(function (response) {
        var questions = [];
        response.data.d.results.forEach(function (field) {
          questions.push({
            Field: toPascalCase(field.Title) + 'Value',
            Question: field.Title,
            Type: field.TypeDisplayName,
            Choices: field.Choices && field.Choices.results
          });
          resolve(questions);
        });
      })["catch"](reject);
    });
  };
  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {string} [params] Parameters to be appended to the requested URL.
   *                          See https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * @return {Promise<Object[]>}
   */


  _this.getResponses = function (params) {
    return new Promise(function (resolve, reject) {
      _http.get(endpoint.listItems(_this.name) + (params || '')).then(function (response) {
        return resolve(response.data.d.results || response.data.d);
      })["catch"](reject);
    });
  };
  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {number} userId User ID to filter responses
   * @return {Promise<Object[]>}
   */


  _this.getResponsesByUser = function (userId) {
    return _this.getResponses("?$filter=(CreatedById eq ".concat(userId, ")"));
  };
  /**
   * Performs a POST request to API to store a new record
   *
   * @param {Object} data The object (using JSON notation) to be saved
   * @return {Promise<Object>}
   */


  _this.createResponse = function (data) {
    return new Promise(function (resolve, reject) {
      _http.post(endpoint.listItems(_this.name), data).then(function (response) {
        return resolve(response.data.d.results);
      })["catch"](reject);
    });
  };
  /**
   * Perform a POST request (with MERGE header) to API to update an existing record based on its ID
   *
   * @param {number} id Identification number for the record to be modified
   * @param {Object} data The object (using JSON notation) to be changed
   * @return {Promise<Object>}
   */


  _this.updateResponse = function (id, data) {
    return _http.post(endpoint.listItems(_this.name) + "(".concat(id, ")"), data, {
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
   * @return {Promise<Object>}
   */


  _this.deleteResponse = function (id) {
    return _http.post(endpoint.listItems(_this.name) + "(".concat(id, ")"), {}, {
      headers: _objectSpread({}, _http.defaults.headers.common, {
        'X-Http-Method': 'DELETE',
        'If-Match': '*'
      })
    });
  };
};