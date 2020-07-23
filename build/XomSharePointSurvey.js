"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var requests = require('./facades/requests');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {String} surveyTitle Survey title to connect to
 * @param {Axios} httpInstance Customized Axios instance to perform HTTP requests
 */


module.exports = function XomSharePointSurvey(surveyTitle, httpInstance) {
  /**
   * Store the SharePoint list name
   *
   * @private
   * @var {String}
   */
  var _title = surveyTitle;
  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */

  var _http = httpInstance;
  /**
   * Eagerly fetches list metadata to get list items type
   *
   * @private
   * @final
   * @var {Promise<String>}
   */

  var _itemsType = requests.getListItemType(_http, _title);
  /**
   * Define property to get & set 'title' value
   *
   * @property {String} title
   */


  Object.defineProperty(this, 'title', {
    get: function get() {
      return _title;
    },
    set: function set(title) {
      _title = String(title);
    }
  });
  /**
   * Get fields that corresponds to the questions and their choices
   *
   * @return {Promise<Array>}
   */

  this.getQuestions = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var response, questions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return requests.getListFields(_http, _title, {
              $filter: '(CanBeDeleted eq true)'
            });

          case 2:
            response = _context.sent;
            questions = response.map(function (field) {
              return {
                Field: field.InternalName,
                Description: field.Description,
                Question: field.Title,
                Type: field.TypeDisplayName,
                Choices: field.Choices && field.Choices.results,
                DefaultValue: field.DefaultValue
              };
            });
            Object.defineProperty(questions, '__response', {
              value: response.__response
            });
            return _context.abrupt("return", questions);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  /**
   * Return a list of the responses stored in the survey list. If no additional
   * parameter is provided, all records are returned. For your reference, check out
   * https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * on how to build parameters
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */

  this.getResponses = function (params) {
    return requests.getListItems(_http, _title, params);
  };
  /**
   * Retrun a single response by its ID
   *
   * @param {Number} id
   * @param {String} [params]
   * @return {Promise<Object>}
   */


  this.findResponse = function (id, params) {
    return requests.getListItemById(_http, _title, id, params);
  };
  /**
   * Save a new response in the SharePoint survey list
   *
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */


  this.submitResponse = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = requests;
              _context2.t1 = _http;
              _context2.t2 = _title;
              _context2.next = 5;
              return _itemsType;

            case 5:
              _context2.t3 = _context2.sent;
              _context2.t4 = data;
              return _context2.abrupt("return", _context2.t0.postListItem.call(_context2.t0, _context2.t1, _context2.t2, _context2.t3, _context2.t4));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Update the response of an existing record
   *
   * @param {Number} id
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */


  this.changeResponse = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, data) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = requests;
              _context3.t1 = _http;
              _context3.t2 = _title;
              _context3.t3 = id;
              _context3.next = 6;
              return _itemsType;

            case 6:
              _context3.t4 = _context3.sent;
              _context3.t5 = data;
              return _context3.abrupt("return", _context3.t0.patchListItem.call(_context3.t0, _context3.t1, _context3.t2, _context3.t3, _context3.t4, _context3.t5));

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();
  /**
   * Delete an existing response
   *
   * @param {Number} id
   * @return {Promise<Object>}
   */


  this["delete"] = function (id) {
    return requests.deleteListItem(_http, _title, id);
  };
};