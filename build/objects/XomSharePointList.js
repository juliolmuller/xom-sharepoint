"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable arrow-body-style */

/* eslint-disable no-underscore-dangle */
var requests = require('../facades/requests');

var genFileBuffer = require('../utils/gen-file-buffer');

var genFileName = require('../utils/gen-file-name');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {String} listTitle List title to connect to
 * @param {Axios} httpInstance Customized Axios instance to perform HTTP requests
 */


module.exports = function XomSharePointList(listTitle, httpInstance) {
  /**
   * Store the SharePoint list title
   *
   * @private
   * @var {String}
   */
  var _title = listTitle;
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
   * Retrun the list fields metadata
   *
   * @param {Boolean} [customOnly]
   * @return {Promise<Object>}
   */

  this.fields = function (customOnly) {
    var query = customOnly ? '?$filter=(CanBeDeleted eq true)' : '';
    return requests.getListFields(_http, _title, query);
  };
  /**
   * Return a list of the items stored in the list. If no additional parameter
   * is provided, all records are returned. For your reference, check out
   * https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * on how to build parameters
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */


  this.get = function (params) {
    return requests.getListItems(_http, _title, params);
  };
  /**
   * Retrun a single list item with the given ID
   *
   * @param {Number} id
   * @param {String} [params]
   * @return {Promise<Object>}
   */


  this.find = function (id, params) {
    return requests.getListItemById(_http, _title, id, params);
  };
  /**
   * Save a new record in the SharePoint list
   *
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */


  this.create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = requests;
              _context.t1 = _http;
              _context.t2 = _title;
              _context.next = 5;
              return _itemsType;

            case 5:
              _context.t3 = _context.sent;
              _context.t4 = data;
              return _context.abrupt("return", _context.t0.postListItem.call(_context.t0, _context.t1, _context.t2, _context.t3, _context.t4));

            case 8:
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
   * Update data of an existing record in the SharePoint list
   *
   * @param {Number} id
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */


  this.update = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, data) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = requests;
              _context2.t1 = _http;
              _context2.t2 = _title;
              _context2.t3 = id;
              _context2.next = 6;
              return _itemsType;

            case 6:
              _context2.t4 = _context2.sent;
              _context2.t5 = data;
              return _context2.abrupt("return", _context2.t0.patchListItem.call(_context2.t0, _context2.t1, _context2.t2, _context2.t3, _context2.t4, _context2.t5));

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Delete an existing record from the SharePoint list
   *
   * @param {Number} id
   * @return {Promise<Object>}
   */


  this["delete"] = function (id) {
    return requests.deleteListItem(_http, _title, id);
  };
  /**
   * Return a list of the attached files in the list item
   *
   * @param {Number} itemId
   * @return {Promise<Array>}
   */


  this.getAttachmentsFrom = function (itemId) {
    return requests.getListItemAttachments(_http, _title, itemId);
  };
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
   * @return {Promise<Object>}
   */


  this.attachTo = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(itemId, fileInput, attchmentName) {
      var fileName, fileBuffer;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              fileName = attchmentName || genFileName(fileInput);
              _context3.next = 3;
              return genFileBuffer(fileInput);

            case 3:
              fileBuffer = _context3.sent;
              return _context3.abrupt("return", requests.uploadListItemAttachment(_http, _title, itemId, fileName, fileBuffer));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x4, _x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();
  /**
   * Rename a given file attachment
   *
   * @param {Number} itemId
   * @param {String} attachmentName
   * @param {String} newName
   * @return {Promise<Object>}
   */


  this.renameAttachment = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(itemId, attachmentName, newName) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", requests.renameListItemAttachment(_http, _title, itemId, attachmentName, newName));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8, _x9) {
      return _ref4.apply(this, arguments);
    };
  }();
  /**
   * Remove a given file attachment from the list item
   *
   * @param {Number} itemId
   * @param {String} attachmentName
   * @return {Promise<Object>}
   */


  this.removeAttachment = function (itemId, attachmentName) {
    return requests.deleteListItemAttachment(_http, _title, itemId, attachmentName);
  };
};