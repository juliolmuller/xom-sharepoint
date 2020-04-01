"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var endpoint = require('../config/endpoint');

var genFileBuffer = require('../utils/genFileBuffer');

var genFileName = require('../utils/genFileName');

var httpFactory = require('../http/xomHttpFactory');

var toPascalCase = require('../utils/toPascalCase');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {String} listTitle List title to connect to
 * @param {Axios} [httpInstance] Customized Axios instance to perform HTTP requests
 */


module.exports = function XomSharePointList(listTitle, httpInstance) {
  var _this = this;

  /**
   * Store the SharePoint list title
   *
   * @private
   * @var {String}
   */
  var _title = listTitle;
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
   * Store the full response of the previous request
   *
   * @private
   * @var {String}
   */


  var _requestDigest = _http.post(endpoint.contextInfo(), {}).then(function (_ref) {
    var data = _ref.data;
    return data.FormDigestValue || data.GetContextWebInformation.FormDigestValue;
  });
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
      _title = title;
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
   * Return a list of the items stored in the list. If no additional parameter
   * is provided, all records are returned. For your reference, check out
   * https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * on how to build parameters
   *
   * @param {String} [params]
   * @return {Promise}
   */

  this.get = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
      var url;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = endpoint.listItems(_this.name) + (params || '');
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

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Retrun a single list item with the given ID
   *
   * @param {Number} id
   * @return {Promise}
   */


  this.find = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
      var url;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = "".concat(endpoint.listItems(_this.name), "(").concat(id, ")");
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

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  /**
   * Save a new record in the SharePoint list
   *
   * @param {Object} data Use literal objects to send data
   * @return {Promise}
   */


  this.create = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
      var url;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = endpoint.listItems(_this.name);
              _context3.next = 3;
              return _http.post(url, data);

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

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }();
  /**
   * Update data of an existing record in the SharePoint list
   *
   * @param {Number} id
   * @param {Object} data Use literal objects to send data
   * @return {Promise}
   */


  this.update = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, data) {
      var url;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              url = "".concat(endpoint.listItems(_this.name), "(").concat(id, ")");
              _context4.next = 3;
              return _http.put(url, data);

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

    return function (_x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }();
  /**
   * Delete an existing record from the SharePoint list
   *
   * @param {Number} id
   * @return {Promise}
   */


  this["delete"] = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      var url;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              url = "".concat(endpoint.listItems(_this.name), "(").concat(id, ")");
              _context5.next = 3;
              return _http["delete"](url);

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

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }();
  /**
   * Return a list of the attached files in the list item
   *
   * @param {Number} itemId
   * @return {Promise}
   */


  this.getAttachments = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(itemId) {
      var url;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              url = endpoint.listItemsAttachment(_this.title, itemId);
              _context6.next = 3;
              return _http.get(url);

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

    return function (_x7) {
      return _ref7.apply(this, arguments);
    };
  }();
  /**
   * Upload a file attachment to a list item
   *
   * @param {Number} itemId
   * @param {String|HTMLElement|FileList|File} fileInput Some reference of the input type 'file':
   *          String - if it is a query selector;
   *          HTMLElement - if it is a direct reference to the input element;
   *          FileList - if it is direct reference to the 'files' attribute of the element; and
   *          File - if it is a direct reference to the file.
   *        For the three first options, as it will result in a array of files (FileList), only
   *        the first File of the collection will be selected. If you want to get the byte buffer
   *        of other files, provide a File instance explicitaly
   * @param {String} [attchmentName] Define a custom name to the attached file
   * @return {Promise}
   */


  this.attach = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(itemId, fileInput, attchmentName) {
      var requestDigest, fileBuffer, url;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              attchmentName = attchmentName || genFileName(fileInput);
              _context7.next = 3;
              return _requestDigest;

            case 3:
              requestDigest = _context7.sent;
              _context7.next = 6;
              return genFileBuffer(fileInput);

            case 6:
              fileBuffer = _context7.sent;
              url = "".concat(endpoint.listItemsAttachment(_this.title, itemId), "/add(filename='").concat(attchmentName, "')");
              _context7.next = 10;
              return _http.post(url, fileBuffer, {
                requestDigest: requestDigest
              });

            case 10:
              _lastHttpResponse = _context7.sent;
              return _context7.abrupt("return", _lastHttpResponse.data);

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x8, _x9, _x10) {
      return _ref8.apply(this, arguments);
    };
  }();
  /**
   * Rename a given file attachment
   *
   * @param {Number} itemId
   * @param {String} attachmentName
   * @param {String} newName
   * @return {Promise}
   */


  this.rename = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(itemId, attachmentName, newName) {
      var requestDigest, attachments, targetFile, newUrl, url;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _requestDigest;

            case 2:
              requestDigest = _context8.sent;
              _context8.next = 5;
              return _this.getAttachments(itemId);

            case 5:
              attachments = _context8.sent;
              targetFile = attachments.filter(function (att) {
                return att.FileName === attachmentName;
              })[0];
              newUrl = targetFile.ServerRelativeUrl.replace(attachmentName, newName);
              url = "".concat(endpoint.serverResource(targetFile.ServerRelativeUrl), "/moveTo(newurl='").concat(newUrl, "', flags=1)");
              _context8.next = 11;
              return _http.put(url, {}, {
                requestDigest: requestDigest
              });

            case 11:
              _lastHttpResponse = _context8.sent;
              return _context8.abrupt("return", _lastHttpResponse.data);

            case 13:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x11, _x12, _x13) {
      return _ref9.apply(this, arguments);
    };
  }();
  /**
   * Remove a given file attachment from the list item
   *
   * @param {Number} itemId
   * @param {String} attachmentName
   * @return {Promise}
   */


  this.remove = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(itemId, attachmentName) {
      var requestDigest, url;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _requestDigest;

            case 2:
              requestDigest = _context9.sent;
              url = "".concat(endpoint.listItemsAttachment(_this.title, itemId), "/getByFileName('").concat(attachmentName, "')");
              _context9.next = 6;
              return _http["delete"](url, {
                requestDigest: requestDigest
              });

            case 6:
              _lastHttpResponse = _context9.sent;
              return _context9.abrupt("return", _lastHttpResponse.data);

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x14, _x15) {
      return _ref10.apply(this, arguments);
    };
  }();
};