"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var axios = require('axios');
/**
 * Instantiate an object to consume SharePoint REST API. As parameters,
 * consider the folloing full URL example you are targeting:
 * "https://myteam.sharepoint.com/sites/cfscuritiba/Lists/MyList/"
 *
 * @class
 * @version 0.4.6
 * @constructor
 * @param {string} siteUrl Base URL of the SharePoint site which the list
 *        belongs to. At the example, the site URL is
 *        "https://myteam.sharepoint.com/sites/cfscuritiba"
 * @param {string} [listName] Name of the list you are targeting. At the
 *        example, the list name is "MyList"
 */


module.exports = function (siteUrl, listName) {
  /**
   * Ensure pointer to propper 'this'
   *
   * @var {this}
   */
  var _this = this;
  /**
   * Private instance of Axios
   *
   * @var {Axios}
   */


  var _axios = axios.create();
  /**
   * Store the SharePoint site URL
   *
   * @var {string}
   */


  var _siteUrl = siteUrl;
  /**
   * Store the SharePoint list name
   *
   * @var {string}
   */

  var _listName = listName || null; // Configure HTTP client defaults


  _axios.defaults.withCredentials = true;
  _axios.defaults.headers.common = {
    'Accept': 'application/json;odata=verbose',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json;odata=verbose'
  };
  /**
   * Define property to get & set 'siteUrl' value
   *
   * @return {string}
   */

  Object.defineProperty(_this, 'siteUrl', {
    get: function get() {
      return _siteUrl;
    },
    set: function set(siteUrl) {
      _siteUrl = siteUrl;
    }
  });
  /**
   * Define property to get & set 'listName' value
   *
   * @return {string}
   */

  Object.defineProperty(_this, 'listName', {
    get: function get() {
      return _listName;
    },
    set: function set(listName) {
      _listName = listName;
    }
  });
  /**
   * Define property to get 'baseUrl' value
   *
   * @return {string}
   */

  Object.defineProperty(_this, 'baseUrl', {
    get: function get() {
      return "".concat(_siteUrl, "/_vti_bin/listdata.svc/").concat(_listName);
    }
  });
  /**
   * Define property to get 'baseAttachmentUrl' value
   *
   * @return {string}
   */

  Object.defineProperty(_this, 'baseAttachmentUrl', {
    get: function get() {
      return "".concat(_siteUrl, "/_api/web/lists/getbytitle(").concat(_listName, ")");
    }
  });
  /**
   * Extract the usefull part of account/login name
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
   * @param {object} user User object literal
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
   * Queries the SharePoint API to grab user information. Inform nothing to get
   * current user information or pass an specific user ID
   *
   * @param {number} id Id of the user you want the information for
   * @return {Promise}
   */


  _this.getUserInfo = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
      var data0, idField, _data, _data2, data1, data2;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!id) {
                _context.next = 8;
                break;
              }

              _context.next = 3;
              return _axios.get("".concat(_siteUrl, "/_vti_bin/listdata.svc/UserInformationList?$top=1"));

            case 3:
              data0 = _context.sent;
              idField = data0.data.d[0].Id ? 'Id' : 'Id0';
              _data = _axios.get("".concat(_siteUrl, "/_api/Web/GetUserById(").concat(id, ")"));
              _data2 = _axios.get("".concat(_siteUrl, "/_vti_bin/listdata.svc/UserInformationList?$filter=(").concat(idField, " eq ").concat(id, ")"));
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                Promise.all([_data, _data2]).then(function (responses) {
                  var mergedAttr = _objectSpread({}, responses[0].data.d, {}, responses[1].data.d.results[0]);

                  addUserProperties(mergedAttr);
                  resolve(mergedAttr);
                })["catch"](function (error) {
                  return reject(error);
                });
              }));

            case 8:
              data1 = _axios.get("".concat(_siteUrl, "/_api/web/CurrentUser"));
              data2 = _axios.get("".concat(_siteUrl, "/_api/SP.UserProfiles.PeopleManager/GetMyProperties"));
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                Promise.all([data1, data2]).then(function (responses) {
                  var mergedAttr = _objectSpread({}, responses[0].data.d, {}, responses[1].data.d);

                  addUserProperties(mergedAttr);
                  resolve(mergedAttr);
                })["catch"](function (error) {
                  return reject(error);
                });
              }));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * Queries SharePoint API searching for user name
   *
   * @param {string} name Partial name of the user
   * @return {Promise}
   */


  _this.searchUser = function (name) {
    return new Promise(function (resolve, reject) {
      _axios.get("".concat(_siteUrl, "/_vti_bin/listdata.svc/UserInformationList?$filter=substringof('").concat(name, "',Name)")).then(function (response) {
        return resolve(response.data.d.results);
      })["catch"](function (error) {
        return reject(error);
      });
    });
  };
  /**
   * Performs a GET request to the API, in order to obtain a records set from
   * the SharePoint list
   *
   * @param {string} params Appends additional parameters to the request, like
   *        filters or sorting
   * @return {Promise}
   */


  _this.get = function (params) {
    return new Promise(function (resolve, reject) {
      _axios.get(_this.baseUrl + (params || '')).then(function (response) {
        return resolve(response.data.d.results);
      })["catch"](function (error) {
        return reject(error);
      });
    });
  };
  /**
   * Performs a GET request to the API, in order to obtain a single record
   * based on its ID
   *
   * @param {number} id Identification number for the record to be retrieved
   * @param {string} params Appends additional parameters to the request, like
   *        filters or sorting
   * @return {Promise}
   */


  _this.getOne = function (id, params) {
    return new Promise(function (resolve, reject) {
      _axios.get("".concat(_this.baseUrl, "(").concat(id, ")").concat(params || '')).then(function (response) {
        return resolve(response.data.d.results);
      })["catch"](function (error) {
        return reject(error);
      });
    });
  };
  /**
   * Performs a POST request to the API, in order to insert a new record in
   * SharePoint list
   *
   * @param {object} data The object (using JSON notation) to be saved (fields
   *        names case must match with the list's)
   * @return {Promise}
   */


  _this.post = function (data) {
    return new Promise(function (resolve, reject) {
      _axios.post(_this.baseUrl, data).then(function (response) {
        return resolve(response.data.d.results);
      })["catch"](function (error) {
        return reject(error);
      });
    });
  };
  /**
   * Performs a PUT request to the API, in order to update the informed
   * fields of an existing record in SharePoint list
   *
   * @param {number} id Identification number for the record to be modified
   * @param {object} data The object (using JSON notation) to be changed (fields
   *        names case must match with the list's)
   * @return {Promise}
   */


  _this.put = function (id, data) {
    return _axios.post("".concat(_this.baseUrl, "(").concat(id, ")"), data, {
      headers: _objectSpread({}, _axios.defaults.headers.common, {
        'X-Http-Method': 'MERGE',
        'If-Match': '*'
      })
    });
  };
  /**
   * This is actualy an alternative to the 'merge' method, no difference, only
   * a matter of name
   *
   * @param {number} id Identification number for the record to be modified
   * @param {object} data The object (using JSON notation) to be changed (fields
   *        names case must match with the list's)
   * @return {Promise}
   */


  _this.put = function (id, data) {
    return _this.merge(id, data);
  };
  /**
   * Performs a POST (with 'DELETE' header) request to the API, in order to
   * delete an existing record in SharePoint list
   *
   * @param {number} id Identification number for the record to be deleted
   * @return {Promise}
   */


  _this["delete"] = function (id) {
    return _axios.post("".concat(_this.baseUrl, "(").concat(id, ")"), {}, {
      headers: _objectSpread({}, _axios.defaults.headers.common, {
        'X-Http-Method': 'DELETE',
        'If-Match': '*'
      })
    });
  };
};
