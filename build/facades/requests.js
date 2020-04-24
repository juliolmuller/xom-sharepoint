"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable arrow-body-style */
var endpoints = require('./endpoints');
/**
 * Define all possible requests to the SharePoint API
 *
 * @var {Object<Function>}
 */


var requests = {};
/**
 * Fetch site root API
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */

requests.getSite = function (http) {
  return http.get(endpoints.site.info());
};
/**
 * Fetch site context API for the request digest
 *
 * @param {Axios} http
 * @return {Promise<String>}
 */


requests.getRequestDigest = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(http) {
    var resp;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return http.post(endpoints.site.contextInfo(), null, {
              digest: false
            });

          case 2:
            resp = _context.sent;
            return _context.abrupt("return", resp.FormDigestValue || resp.GetContextWebInformation.FormDigestValue);

          case 4:
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
 * Fetch for site parent metadata
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */


requests.getSiteParent = function (http) {
  return http.get(endpoints.site.parentSite());
};
/**
 * Fetch list of content in site Recycle Bin
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */


requests.getSiteRecycleBin = function (http) {
  return http.get(endpoints.site.recycleBin());
};
/**
 * Fetch for site Regional Settings
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */


requests.getSiteRegionalSettings = function (http) {
  return http.get(endpoints.site.regionalSettings());
};
/**
 * Fetch for basic current user information
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */


requests.getSiteCurrentUser = function (http) {
  return http.get(endpoints.users.current());
};
/**
 * Fetch list metadata for site users
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */


requests.getSiteUsersList = function (http) {
  return http.get(endpoints.users.listMetadata());
};
/**
 * Fetch list fields metadata for site users
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getSiteUsersListFields = function (http) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return http.get(endpoints.users.listFields(query));
};
/**
 * Fetch list items for site users
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getSiteUsersListItems = function (http) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return http.get(endpoints.users.listItems(query));
};
/**
 * Fetch a single list item with user information
 *
 * @param {Axios} http
 * @param {Number} id
 * @return {Promise<Object>}
 */


requests.getSiteUserById = function (http, id) {
  return http.get(endpoints.users.byId(id));
};
/**
 * Fetch list of all site folders/libraries
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getFolders = function (http) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return http.get(endpoints.libs.index(query));
};
/**
 * Fetch the content with a given folder/library based on its relative URL
 *
 * @param {Axios} http
 * @param {String} relativeUrl
 * @return {Promise<Object>}
 */


requests.getFolderByUrl = function (http, relativeUrl) {
  return http.get(endpoints.libs.folderByUrl(relativeUrl));
};
/**
 * Fetch the content with a given file within a library based on its relative URL
 *
 * @param {Axios} http
 * @param {String} relativeUrl
 * @return {Promise<Object>}
 */


requests.getFileByUrl = function (http, relativeUrl) {
  return http.get(endpoints.libs.fileByUrl(relativeUrl));
};
/**
 * Fetch list of all site lists
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getLists = function (http) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return http.get(endpoints.lists.index(query));
};
/**
 * Create a new list in the site
 *
 * @param {Axios} http
 * @param {String} title
 * @return {Promise<Object>}
 */


requests.createList = function (http, title) {
  return http.post(endpoints.lists.index(), {
    __metadata: {
      type: 'SP.List'
    },
    BaseTemplate: 100,
    Title: title
  });
};
/**
 * Delete an existing list in the site
 *
 * @param {Axios} http
 * @param {String} title
 * @return {Promise<Object>}
 */


requests.deleteList = function (http, title) {
  return http["delete"](endpoints.lists.byTitle(title));
};
/**
 * Fetch list metadata
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} [query]
 * @return {Promise<Object>}
 */


requests.getListByTitle = function (http, title) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return http.get(endpoints.lists.byTitle(title, query));
};
/**
 * Fetch list metadata
 *
 * @param {Axios} http
 * @param {String} title
 * @return {Promise<String>}
 */


requests.getListItemType = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(http, title) {
    var resp;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return requests.getListByTitle(http, title, '?$select=ListItemEntityTypeFullName');

          case 2:
            resp = _context2.sent;
            return _context2.abrupt("return", resp.ListItemEntityTypeFullName);

          case 4:
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
 * Fetch list fields metadata
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getListFields = function (http, title) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return http.get(endpoints.lists.fields(title, query));
};
/**
 * Fetch list items
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getListItems = function (http, title) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return http.get(endpoints.lists.items(title, query));
};
/**
 * Fetch a single list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @param {String} [query]
 * @return {Promise<Object>}
 */


requests.getListItemById = function (http, title, itemId) {
  var query = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  return http.get(endpoints.lists.itemById(title, itemId, query));
};
/**
 * Create a new record to the list
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} type
 * @param {Object} data
 * @return {Promise<Array>}
 */


requests.postListItem = function (http, title, type, data) {
  return http.post(endpoints.lists.items(title), _objectSpread({
    __metadata: {
      type: type
    }
  }, data));
};
/**
 * Update an existing record in the list
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @param {String} type
 * @param {Object} data
 * @return {Promise<Array>}
 */


requests.patchListItem = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(http, title, itemId, type, data) {
    var patchResp, updatedItem;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return http.patch(endpoints.lists.itemById(title, itemId), _objectSpread({
              __metadata: {
                type: type
              }
            }, data));

          case 2:
            patchResp = _context3.sent;
            _context3.next = 5;
            return requests.getListItemById(http, title, itemId);

          case 5:
            updatedItem = _context3.sent;
            delete patchResp.data;
            updatedItem.__response = patchResp;
            return _context3.abrupt("return", updatedItem);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x4, _x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Update an existing record in the list
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @return {Promise<Array>}
 */


requests.deleteListItem = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(http, title, itemId) {
    var originalItem, deleteResp;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return requests.getListItemById(http, title, itemId);

          case 2:
            originalItem = _context4.sent;
            _context4.next = 5;
            return http["delete"](endpoints.lists.itemById(title, itemId));

          case 5:
            deleteResp = _context4.sent;
            delete deleteResp.data;
            originalItem.__response = deleteResp;
            return _context4.abrupt("return", originalItem);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Fetch attachments of a given list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @return {Promise<Array>}
 */


requests.getListItemAttachments = function (http, title, itemId) {
  return http.get(endpoints.lists.itemAttachments(title, itemId));
};
/**
 * Upload an attachment to a given list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @param {String} fileName
 * @param {ArrayBuffer} fileBuffer
 * @return {Promise<Object>}
 */


requests.uploadListItemAttachment = function (http, title, itemId, fileName, fileBuffer) {
  return http.post(endpoints.lists.itemAttachmentsUpload(title, itemId, fileName), fileBuffer);
};
/**
 * Rename an existing attachment from a given list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @param {String} oldFileName
 * @param {String} newFileName
 * @return {Promise<Object>}
 */


requests.renameListItemAttachment = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(http, title, itemId, oldFileName, newFileName) {
    var attachments, oldFileUrl, newFileUrl;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return requests.getListItemAttachments(http, title, itemId);

          case 2:
            attachments = _context5.sent;
            oldFileUrl = attachments.find(function (att) {
              return att.FileName === oldFileName;
            }).ServerRelativeUrl;
            newFileUrl = oldFileUrl.replace(oldFileName, newFileName);
            return _context5.abrupt("return", http.patch(endpoints.lists.itemAttachmentsRename(oldFileUrl, newFileUrl)));

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x12, _x13, _x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Delete an attachment of a given list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @param {String} fileName
 * @return {Promise<Object>}
 */


requests.deleteListItemAttachment = function (http, title, itemId, fileName) {
  return http["delete"](endpoints.lists.itemAttachmentByName(title, itemId, fileName));
};

module.exports = requests;