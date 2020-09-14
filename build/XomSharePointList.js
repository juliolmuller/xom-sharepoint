"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

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

var to_arraybuffer_1 = __importDefault(require("@lacussoft/to-arraybuffer"));

var requests = __importStar(require("./facades/requests"));

var exceptions = __importStar(require("./facades/exceptions"));
/**
 * Instantiate the object with the necessary information to connect to a SharePoint list through its REST API.
 */


var XomSharePointList = /*#__PURE__*/function () {
  function XomSharePointList(listTitle, httpInstance) {
    (0, _classCallCheck2["default"])(this, XomSharePointList);
    this._title = listTitle;
    this._http = httpInstance;
    this._itemsType = requests.getListItemType(this._http, this._title);
  }

  (0, _createClass2["default"])(XomSharePointList, [{
    key: "getFields",

    /**
     * Returns the list fields metadata;
     */
    value: function getFields(params) {
      return requests.getListFields(this._http, this._title, params);
    }
    /**
     * Returns a list of the items stored in the list.
     */

  }, {
    key: "getItems",
    value: function getItems(params) {
      return requests.getListItems(this._http, this._title, params);
    }
    /**
     * Returns a single list item with the given ID.
     */

  }, {
    key: "findItem",
    value: function findItem(itemId, params) {
      return requests.getListItemById(this._http, this._title, itemId, params);
    }
  }, {
    key: "saveItem",
    value: function saveItem(param1, param2) {
      var _ref = param2 || param1,
          id = _ref.Id,
          rest = (0, _objectWithoutProperties2["default"])(_ref, ["Id"]);

      return id ? this.updateItem(id, rest) : this.createItem(rest);
    }
    /**
     * Saves a new record in the SharePoint list.
     */

  }, {
    key: "createItem",
    value: function () {
      var _createItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = requests;
                _context.t1 = this._http;
                _context.t2 = this._title;
                _context.next = 5;
                return this._itemsType;

              case 5:
                _context.t3 = _context.sent;
                _context.t4 = data;
                return _context.abrupt("return", _context.t0.postListItem.call(_context.t0, _context.t1, _context.t2, _context.t3, _context.t4));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createItem(_x) {
        return _createItem.apply(this, arguments);
      }

      return createItem;
    }()
  }, {
    key: "updateItem",
    value: function () {
      var _updateItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(param1, param2) {
        var _ref2, _ref2$Id, id, rest;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref2 = param2 || param1, _ref2$Id = _ref2.Id, id = _ref2$Id === void 0 ? param1 : _ref2$Id, rest = (0, _objectWithoutProperties2["default"])(_ref2, ["Id"]);

                if (!isNaN(id)) {
                  _context2.next = 3;
                  break;
                }

                throw exceptions.missingItemId();

              case 3:
                _context2.t0 = requests;
                _context2.t1 = this._http;
                _context2.t2 = this._title;
                _context2.t3 = id;
                _context2.next = 9;
                return this._itemsType;

              case 9:
                _context2.t4 = _context2.sent;
                _context2.t5 = rest;
                return _context2.abrupt("return", _context2.t0.patchListItem.call(_context2.t0, _context2.t1, _context2.t2, _context2.t3, _context2.t4, _context2.t5));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateItem(_x2, _x3) {
        return _updateItem.apply(this, arguments);
      }

      return updateItem;
    }()
  }, {
    key: "deleteItem",
    value: function deleteItem(param1) {
      var _param1$Id = param1.Id,
          id = _param1$Id === void 0 ? param1 : _param1$Id;

      if (isNaN(id)) {
        throw exceptions.missingItemId();
      }

      return requests.deleteListItem(this._http, this._title, id);
    }
  }, {
    key: "getAttachments",
    value: function getAttachments(param1) {
      var _param1$Id2 = param1.Id,
          id = _param1$Id2 === void 0 ? param1 : _param1$Id2;

      if (isNaN(id)) {
        throw exceptions.missingItemId();
      }

      return requests.getListItemAttachments(this._http, this._title, id);
    }
  }, {
    key: "addAttachment",
    value: function () {
      var _addAttachment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(param1, fileName, fileReference) {
        var fileBuffer, _param1$Id3, id;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return to_arraybuffer_1["default"](fileReference);

              case 2:
                fileBuffer = _context3.sent;
                _param1$Id3 = param1.Id, id = _param1$Id3 === void 0 ? param1 : _param1$Id3;

                if (!isNaN(id)) {
                  _context3.next = 6;
                  break;
                }

                throw exceptions.missingItemId();

              case 6:
                return _context3.abrupt("return", requests.uploadListItemAttachment(this._http, this._title, id, fileName, fileBuffer));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addAttachment(_x4, _x5, _x6) {
        return _addAttachment.apply(this, arguments);
      }

      return addAttachment;
    }()
  }, {
    key: "renameAttachment",
    value: function renameAttachment(param1, currentName, newName) {
      var _param1$Id4 = param1.Id,
          id = _param1$Id4 === void 0 ? param1 : _param1$Id4;

      if (isNaN(id)) {
        throw exceptions.missingItemId();
      }

      return requests.renameListItemAttachment(this._http, this._title, id, currentName, newName);
    }
  }, {
    key: "deleteAttachment",
    value: function deleteAttachment(param1, fileName) {
      var _param1$Id5 = param1.Id,
          id = _param1$Id5 === void 0 ? param1 : _param1$Id5;

      if (isNaN(id)) {
        throw exceptions.missingItemId();
      }

      return requests.deleteListItemAttachment(this._http, this._title, id, fileName);
    }
  }, {
    key: "title",
    get: function get() {
      return this._title;
    }
  }]);
  return XomSharePointList;
}();

exports["default"] = XomSharePointList;