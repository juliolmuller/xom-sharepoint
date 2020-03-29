"use strict";

var endpoint = require('../config/endpoint');

var httpFactory = require('../http/xomHttpFactory');

var toPascalCase = require('../utils/toPascalCase');
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

  var _http = axiosInstance || httpFactory();
  /**
   * Define property to get & set 'title' value
   *
   * @property {string} title
   */


  Object.defineProperty(this, 'title', {
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

  Object.defineProperty(this, 'name', {
    get: function get() {
      return toPascalCase(_title);
    }
  });
  /**
   * Get fields that corresponds to the questions and their choices
   *
   * @return {Promise}
   */

  this.getQuestions = function () {
    return _http.get("".concat(endpoint.listFields(_this.title), "?$filter=(CanBeDeleted eq true)")).then(function (response) {
      var questions = [];
      response.data.forEach(function (field) {
        questions.push({
          Field: "".concat(toPascalCase(field.Title), "Value"),
          Question: field.Title,
          Type: field.TypeDisplayName,
          Choices: field.Choices && field.Choices.results
        });
      });
      response.data = questions;
      return response;
    });
  };
  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {string} [params] Parameters to be appended to the requested URL.
   *                          See https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * @return {Promise}
   */


  this.getResponses = function (params) {
    return _http.get(endpoint.listItems(_this.name) + (params || ''));
  };
  /**
   * Perform a GET request to API to obtain all records from the list
   *
   * @param {number} userId User ID to filter responses
   * @return {Promise}
   */


  this.getResponsesByUser = function (userId) {
    return _this.getResponses("?$filter=(CreatedById eq ".concat(userId, ")"));
  };
  /**
   * Performs a POST request to API to store a new record
   *
   * @param {Object} data The object (using JSON notation) to be saved
   * @return {Promise}
   */


  this.createResponse = function (data) {
    return _http.post(endpoint.listItems(_this.name), data);
  };
  /**
   * Perform a POST request (with MERGE header) to API to update an existing record based on its ID
   *
   * @param {number} id Identification number for the record to be modified
   * @param {Object} data The object (using JSON notation) to be changed
   * @return {Promise}
   */


  this.updateResponse = function (id, data) {
    return _http.put("".concat(endpoint.listItems(_this.name), "(").concat(id, ")"), data);
  };
  /**
   * Perform a POST request (with DELETE header) to API delete an existing record
   *
   * @param {number} id Identification number for the record to be deleted
   * @return {Promise}
   */


  this.deleteResponse = function (id) {
    return _http["delete"]("".concat(endpoint.listItems(_this.name), "(").concat(id, ")"));
  };
};