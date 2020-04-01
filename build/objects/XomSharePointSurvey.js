"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var endpoint = require('../config/endpoint');

var httpFactory = require('../http/xomHttpFactory');

var toPascalCase = require('../utils/toPascalCase');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {String} surveyTitle Survey title to connect to
 * @param {Axios} [httpInstance] Customized Axios instance to perform HTTP requests
 */


module.exports = function XomSharePointSurvey(surveyTitle, httpInstance) {
  var _this = this;

  /**
   * Store the SharePoint list name
   *
   * @private
   * @var {String}
   */
  var _title = surveyTitle;
  /**
   * Store the full response of the previous request
   *
   * @private
   * @var {Object}
   */

  var _lastHttpResponse = null;
  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */

  var _http = httpInstance || httpFactory();
  /**
   * Define property to get & set 'title' value
   *
   * @property {String} title
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
   * @property {String} name
   */

  Object.defineProperty(this, 'name', {
    get: function get() {
      return toPascalCase(_title);
    }
  });
  /**
   * Define property to get & set 'lastHttpResponse' value
   *
   * @property {Object} lastHttpResponse
   */

  Object.defineProperty(this, 'lastHttpResponse', {
    get: function get() {
      return _lastHttpResponse;
    }
  });
  /**
   * Get fields that corresponds to the questions and their choices
   *
   * @return {Promise}
   */

  this.getQuestions = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var url;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "".concat(endpoint.listFields(_this.title), "?$filter=(CanBeDeleted eq true)");
            _context.next = 3;
            return _http.get(url);

          case 3:
            _lastHttpResponse = _context.sent;
            return _context.abrupt("return", _lastHttpResponse.data.map(function (field) {
              return {
                Field: "".concat(toPascalCase(field.Title), "Value"),
                Question: field.Title,
                Type: field.TypeDisplayName,
                Choices: field.Choices && field.Choices.results
              };
            }));

          case 5:
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
   * @return {Promise}
   */

  this.get = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
      var url;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = endpoint.listItems(_this.name) + (params || '');
              _context2.next = 3;
              return _http.get(url);

            case 3:
              _lastHttpResponse = _context2.sent;
              return _context2.abrupt("return", _lastHttpResponse.data);

            case 5:
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
   * Retrun a single response by its ID
   *
   * @param {Number} id
   * @return {Promise}
   */


  this.find = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      var url;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = "".concat(endpoint.listItems(_this.name), "(").concat(id, ")");
              _context3.next = 3;
              return _http.get(url);

            case 3:
              _lastHttpResponse = _context3.sent;
              return _context3.abrupt("return", _lastHttpResponse.data);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  /**
   * Return the responses created by a given user
   *
   * @param {Number} userId
   * @return {Promise}
   */


  this.findByUser = function (userId) {
    return _this.get("?$filter=(CreatedById eq ".concat(userId, ")"));
  };
  /**
   * Save a new response in the SharePoint survey list
   *
   * @param {Object} data Use literal objects to send data
   * @return {Promise}
   */


  this.create = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
      var url;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              url = endpoint.listItems(_this.name);
              _context4.next = 3;
              return _http.post(url, data);

            case 3:
              _lastHttpResponse = _context4.sent;
              return _context4.abrupt("return", _lastHttpResponse.data);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }();
  /**
   * Update the response of an existing record
   *
   * @param {Number} id
   * @param {Object} data Use literal objects to send data
   * @return {Promise}
   */


  this.update = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, data) {
      var url;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              url = "".concat(endpoint.listItems(_this.name), "(").concat(id, ")");
              _context5.next = 3;
              return _http.put(url, data);

            case 3:
              _lastHttpResponse = _context5.sent;
              return _context5.abrupt("return", _lastHttpResponse.data);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }();
  /**
   * Delete an existing response
   *
   * @param {Number} id
   * @return {Promise}
   */


  this["delete"] = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
      var url;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              url = "".concat(endpoint.listItems(_this.name), "(").concat(id, ")");
              _context6.next = 3;
              return _http["delete"](url);

            case 3:
              _lastHttpResponse = _context6.sent;
              return _context6.abrupt("return", _lastHttpResponse.data);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }();
};