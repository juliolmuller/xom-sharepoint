"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var endpoint = require('../config/endpoint');

var httpFactory = require('../http/xomHttpFactory');

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
  var _this = this;

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

  var _http = httpFactory(baseSiteUrl);
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
   * Extract useful parts of account/login name
   *
   * @param {String} account Account/login name to be trimmed
   * @return {String}
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


  this.getInfo = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var url;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = endpoint.siteInfo();
            _context.next = 3;
            return _http.get(url);

          case 3:
            _lastHttpResponse = _context.sent;
            return _context.abrupt("return", _lastHttpResponse.data);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  /**
   * Queries the SharePoint API to get user information. Inform nothing to get
   * current user information or pass an specific user ID
   *
   * @param {Number} [id] ID of the user you want the information for
   * @return {Promise}
   */

  this.getUserInfo = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
      var response, idField;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (id) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", _this.getMyInfo());

            case 2:
              _context2.next = 4;
              return _http.get("".concat(endpoint.userInfo(), "?$top=1"));

            case 4:
              response = _context2.sent;
              idField = response.data[0].Id ? 'Id' : 'Id0';
              _context2.next = 8;
              return Promise.all([_http.get(endpoint.user(id)), _http.get("".concat(endpoint.userInfo(), "?$filter=(").concat(idField, " eq ").concat(id, ")"))]);

            case 8:
              _lastHttpResponse = _context2.sent;
              return _context2.abrupt("return", addUserProperties(_objectSpread({}, _lastHttpResponse[0].data, {}, _lastHttpResponse[1].data)));

            case 10:
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
   * Queries the SharePoint API to get current user information
   *
   * @deprecated
   * @return {Promise}
   */


  this.getMyInfo = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Promise.all([_http.get(endpoint.currentUser()), _http.get(endpoint.currentUserInfo())]);

          case 2:
            _lastHttpResponse = _context3.sent;
            return _context3.abrupt("return", addUserProperties(_objectSpread({}, _lastHttpResponse[0].data, {}, _lastHttpResponse[1].data)));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  /**
   * Queries SharePoint API searching for user name
   *
   * @param {String} name Partial name of the user
   * @return {Promise}
   */

  this.searchUser = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(name) {
      var url;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              url = "".concat(endpoint.userInfo(), "?$filter=substringof('").concat(name, "',Name)");
              _context4.next = 3;
              return _http.get(url);

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

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }();
  /**
   * Return an array with all the resources stored in the site (lists)
   *
   * @return {Promise}
   */


  this.getResources = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var url;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            url = endpoint.resourcesIndex();
            _context5.next = 3;
            return _http.get(url);

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
   * Return a reference to connect to a SharePoint survey
   *
   * @param {String} surveyTitle SharePoint survey title
   * @return {XomSharePointList}
   */


  this.getSurvey = function (surveyTitle) {
    return new XomSharePointSurvey(surveyTitle, _http);
  };
};