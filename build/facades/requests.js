"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileToFolder = exports.getFileByUrl = exports.getFilesInFolder = exports.createFolder = exports.getFoldersInFolder = exports.getFolderByUrl = exports.getFolders = exports.deleteListItemAttachment = exports.renameListItemAttachment = exports.uploadListItemAttachment = exports.getListItemAttachments = exports.deleteListItem = exports.patchListItem = exports.postListItem = exports.getListItemById = exports.getListItems = exports.getListFields = exports.getListItemType = exports.getListByTitle = exports.deleteList = exports.createList = exports.getLists = exports.getSiteUserById = exports.getSiteUsersListItems = exports.getSiteUsersListFields = exports.getSiteUsersList = exports.getSiteCurrentUser = exports.getSiteRegionalSettings = exports.getSiteRecycleBin = exports.getSiteParent = exports.getRequestDigest = exports.getSite = void 0;

var endpoints = __importStar(require("../endpoints"));

var rewrapResponse_1 = __importDefault(require("../utils/rewrapResponse"));

var expandPictureURL_1 = __importDefault(require("../utils/expandPictureURL"));
/**
 * Fetch site root API
 */


function getSite(http) {
  var uri = endpoints.site.info();
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getSite = getSite;
/**
 * Fetch site context API for the request digest
 */

function getRequestDigest(_x) {
  return _getRequestDigest.apply(this, arguments);
}

function _getRequestDigest() {
  _getRequestDigest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(http) {
    var uri, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            uri = endpoints.site.contextInfo();
            _context.next = 3;
            return http.post(uri, null, {
              digest: false
            }).then(rewrapResponse_1["default"]);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response.FormDigestValue || response.GetContextWebInformation.FormDigestValue);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getRequestDigest.apply(this, arguments);
}

exports.getRequestDigest = getRequestDigest;
/**
 * Fetch for site parent metadata
 */

function getSiteParent(http) {
  var uri = endpoints.site.parentSite();
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getSiteParent = getSiteParent;
/**
 * Fetch list of content in site Recycle Bin
 */

function getSiteRecycleBin(http) {
  var uri = endpoints.site.recycleBin();
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getSiteRecycleBin = getSiteRecycleBin;
/**
 * Fetch for site Regional Settings
 */

function getSiteRegionalSettings(http) {
  var uri = endpoints.site.regionalSettings();
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getSiteRegionalSettings = getSiteRegionalSettings;
/**
 * Fetch for basic current user information
 */

function getSiteCurrentUser(http) {
  var uri = endpoints.users.current();
  return http.get(uri).then(rewrapResponse_1["default"]).then(expandPictureURL_1["default"]);
}

exports.getSiteCurrentUser = getSiteCurrentUser;
/**
 * Fetch list metadata for site users
 */

function getSiteUsersList(http) {
  var uri = endpoints.users.listMetadata();
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getSiteUsersList = getSiteUsersList;
/**
 * Fetch list fields metadata for site users
 */

function getSiteUsersListFields(http, query) {
  var uri = endpoints.users.listFields(query);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getSiteUsersListFields = getSiteUsersListFields;
/**
 * Fetch list items for site users
 */

function getSiteUsersListItems(_x2, _x3) {
  return _getSiteUsersListItems.apply(this, arguments);
}

function _getSiteUsersListItems() {
  _getSiteUsersListItems = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(http, query) {
    var uri, users;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            uri = endpoints.users.listItems(query);
            _context2.next = 3;
            return http.get(uri).then(rewrapResponse_1["default"]);

          case 3:
            users = _context2.sent;
            users.forEach(expandPictureURL_1["default"]);
            return _context2.abrupt("return", users);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getSiteUsersListItems.apply(this, arguments);
}

exports.getSiteUsersListItems = getSiteUsersListItems;
/**
 * Fetch a single list item with user information
 */

function getSiteUserById(http, id) {
  var uri = endpoints.users.byId(id);
  return http.get(uri).then(rewrapResponse_1["default"]).then(expandPictureURL_1["default"]);
}

exports.getSiteUserById = getSiteUserById;
/**
 * Fetch list of all site lists
 */

function getLists(http, query) {
  var uri = endpoints.lists.index(query);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getLists = getLists;
/**
 * Create a new list in the site
 */

function createList(http, listTitle) {
  var uri = endpoints.lists.index();
  var metadata = {
    __metadata: {
      type: 'SP.List'
    },
    BaseTemplate: 100,
    Title: listTitle
  };
  return http.post(uri, metadata).then(rewrapResponse_1["default"]);
}

exports.createList = createList;
/**
 * Delete an existing list in the site
 */

function deleteList(http, listTitle) {
  var uri = endpoints.lists.byTitle(listTitle);
  return http["delete"](uri).then(rewrapResponse_1["default"]);
}

exports.deleteList = deleteList;
/**
 * Fetch list metadata
 */

function getListByTitle(http, listTitle, query) {
  var uri = endpoints.lists.byTitle(listTitle, query);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getListByTitle = getListByTitle;
/**
 * Fetch list metadata
 */

function getListItemType(_x4, _x5) {
  return _getListItemType.apply(this, arguments);
}

function _getListItemType() {
  _getListItemType = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(http, listTitle) {
    var response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getListByTitle(http, listTitle, {
              $select: 'ListItemEntityTypeFullName'
            });

          case 2:
            response = _context3.sent;
            return _context3.abrupt("return", response.ListItemEntityTypeFullName);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getListItemType.apply(this, arguments);
}

exports.getListItemType = getListItemType;
/**
 * Fetch list fields metadata
 */

function getListFields(http, listTitle, query) {
  var uri = endpoints.lists.fields(listTitle, query);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getListFields = getListFields;
/**
 * Fetch list items
 */

function getListItems(http, listTitle, query) {
  var uri = endpoints.lists.items(listTitle, query);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getListItems = getListItems;
/**
 * Fetch a single list item
 */

function getListItemById(http, listTitle, itemId, query) {
  var uri = endpoints.lists.itemById(listTitle, itemId, query);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getListItemById = getListItemById;
/**
 * Create a new record to the list
 */

function postListItem(http, listTitle, type, data) {
  var uri = endpoints.lists.items(listTitle);

  var metadata = _objectSpread({
    __metadata: {
      type: type
    }
  }, data);

  return http.post(uri, metadata).then(rewrapResponse_1["default"]);
}

exports.postListItem = postListItem;
/**
 * Update an existing record in the list
 */

function patchListItem(_x6, _x7, _x8, _x9, _x10) {
  return _patchListItem.apply(this, arguments);
}

function _patchListItem() {
  _patchListItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(http, listTitle, itemId, type, data) {
    var uri, metadata, _yield$http$patch$the, patchResponse, updatedItem;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            uri = endpoints.lists.itemById(listTitle, itemId);
            metadata = _objectSpread({
              __metadata: {
                type: type
              }
            }, data);
            _context4.next = 4;
            return http.patch(uri, metadata).then(rewrapResponse_1["default"]);

          case 4:
            _yield$http$patch$the = _context4.sent;
            patchResponse = _yield$http$patch$the.__response;
            _context4.next = 8;
            return getListItemById(http, listTitle, itemId);

          case 8:
            updatedItem = _context4.sent;
            updatedItem.__response = patchResponse;
            return _context4.abrupt("return", updatedItem);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _patchListItem.apply(this, arguments);
}

exports.patchListItem = patchListItem;
/**
 * Update an existing record in the list
 */

function deleteListItem(_x11, _x12, _x13) {
  return _deleteListItem.apply(this, arguments);
}

function _deleteListItem() {
  _deleteListItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(http, listTitle, itemId) {
    var uri, originalItem, _yield$http$delete$th, deleteResponse;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            uri = endpoints.lists.itemById(listTitle, itemId);
            _context5.next = 3;
            return getListItemById(http, listTitle, itemId);

          case 3:
            originalItem = _context5.sent;
            _context5.next = 6;
            return http["delete"](uri).then(rewrapResponse_1["default"]);

          case 6:
            _yield$http$delete$th = _context5.sent;
            deleteResponse = _yield$http$delete$th.__response;
            originalItem.__response = deleteResponse;
            return _context5.abrupt("return", originalItem);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _deleteListItem.apply(this, arguments);
}

exports.deleteListItem = deleteListItem;
/**
 * Fetch attachments of a given list item
 */

function getListItemAttachments(http, listTitle, itemId) {
  var uri = endpoints.lists.itemAttachments(listTitle, itemId);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getListItemAttachments = getListItemAttachments;
/**
 * Upload an attachment to a given list item
 */

function uploadListItemAttachment(http, listTitle, itemId, fileName, fileBuffer) {
  var uri = endpoints.lists.itemAttachmentsUpload(listTitle, itemId, fileName);
  return http.post(uri, fileBuffer).then(rewrapResponse_1["default"]);
}

exports.uploadListItemAttachment = uploadListItemAttachment;
/**
 * Rename an existing attachment from a given list item
 */

function renameListItemAttachment(_x14, _x15, _x16, _x17, _x18) {
  return _renameListItemAttachment.apply(this, arguments);
}

function _renameListItemAttachment() {
  _renameListItemAttachment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(http, listTitle, itemId, currentFileName, newFileName) {
    var attachments, oldFileUrl, newFileUrl, uri;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getListItemAttachments(http, listTitle, itemId);

          case 2:
            attachments = _context6.sent;
            oldFileUrl = attachments.find(function (att) {
              return att.FileName === currentFileName;
            }).ServerRelativeUrl;
            newFileUrl = oldFileUrl.replace(currentFileName, newFileName);
            uri = endpoints.lists.itemAttachmentsRename(oldFileUrl, newFileUrl);
            return _context6.abrupt("return", http.patch(uri).then(rewrapResponse_1["default"]));

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _renameListItemAttachment.apply(this, arguments);
}

exports.renameListItemAttachment = renameListItemAttachment;
/**
 * Delete an attachment of a given list item
 */

function deleteListItemAttachment(http, listTitle, itemId, fileName) {
  var uri = endpoints.lists.itemAttachmentByName(listTitle, itemId, fileName);
  return http["delete"](uri).then(rewrapResponse_1["default"]);
}

exports.deleteListItemAttachment = deleteListItemAttachment;
/**
 * Fetch list of all site folders/libraries
 */

function getFolders(http, query) {
  var uri = endpoints.folders.index(query);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getFolders = getFolders;
/**
 * Fetch the content with a given folder/library based on its relative URL
 */

function getFolderByUrl(http, relativeUrl) {
  var uri = endpoints.folders.folderByUrl(relativeUrl);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getFolderByUrl = getFolderByUrl;
/**
 * Fetch the existing folders within a given folder based on its relative URL
 */

function getFoldersInFolder(http, relativeUrl, query) {
  var uri = endpoints.folders.foldersInFolder(relativeUrl, query);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getFoldersInFolder = getFoldersInFolder;
/**
 * Creates a new folder given library or folder based on its relative URL
 */

function createFolder(http, relativeUrl, folderName) {
  var uri = endpoints.folders.index();
  var metadata = {
    ServerRelativeUrl: "".concat(relativeUrl, "/").concat(folderName),
    __metadata: {
      type: 'SP.Folder'
    }
  };
  return http.post(uri, metadata).then(rewrapResponse_1["default"]);
}

exports.createFolder = createFolder;
/**
 * Fetch the existing folders within a given folder based on its relative URL
 */

function getFilesInFolder(http, relativeUrl, query) {
  var uri = endpoints.folders.filesInFolder(relativeUrl, query);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getFilesInFolder = getFilesInFolder;
/**
 * Fetch the content with a given file within a library based on its relative URL
 */

function getFileByUrl(http, relativeUrl) {
  var uri = endpoints.folders.fileByUrl(relativeUrl);
  return http.get(uri).then(rewrapResponse_1["default"]);
}

exports.getFileByUrl = getFileByUrl;
/**
 * Fetch the existing folders within a given folder based on its relative URL
 */

function uploadFileToFolder(http, relativeUrl, fileName, fileBuffer) {
  var uri = endpoints.folders.newFileToFolder(relativeUrl, fileName);
  return http.post(uri, fileBuffer).then(rewrapResponse_1["default"]);
}

exports.uploadFileToFolder = uploadFileToFolder;