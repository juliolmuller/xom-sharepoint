"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
/**
 * Instantiate the object with the necessary information to connect to a SharePoint file library through its REST API.
 */


var XomSharePointLibrary = /*#__PURE__*/function () {
  function XomSharePointLibrary(folderAddress, httpInstance) {
    (0, _classCallCheck2["default"])(this, XomSharePointLibrary);
    this._address = folderAddress;
    this._http = httpInstance;
    this._filesType = '';
  }

  (0, _createClass2["default"])(XomSharePointLibrary, [{
    key: "listSubfolders",

    /**
     * Returns a list of the folders within the folder.
     */
    value: function listSubfolders(params) {
      return requests.getFoldersInFolder(this._http, this.relativeUrl, params);
    }
    /**
     * Creates a folder within this folder.
     */

  }, {
    key: "createSubfolder",
    value: function createSubfolder(folderName) {
      return requests.createFolder(this._http, this.relativeUrl, folderName);
    }
    /**
     * Returns a list of the files within this folder.
     */

  }, {
    key: "listFiles",
    value: function listFiles(params) {
      return requests.getFilesInFolder(this._http, this.relativeUrl, params);
    }
    /**
     * Uploads a file into the folder.
     */

  }, {
    key: "uploadFile",
    value: function () {
      var _uploadFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(fileName, fileReference) {
        var fileBuffer, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return to_arraybuffer_1["default"](fileReference);

              case 2:
                fileBuffer = _context.sent;
                _context.next = 5;
                return requests.uploadFileToFolder(this._http, this.relativeUrl, fileName, fileBuffer);

              case 5:
                result = _context.sent;
                this._filesType = this._filesType || result.__metadata.type;
                return _context.abrupt("return", result);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function uploadFile(_x, _x2) {
        return _uploadFile.apply(this, arguments);
      }

      return uploadFile;
    }()
  }, {
    key: "relativeUrl",
    get: function get() {
      var baseUrl = new URL(this._http.defaults.baseURL);
      return "".concat(baseUrl.pathname, "/").concat(this._address);
    }
  }]);
  return XomSharePointLibrary;
}();

exports["default"] = XomSharePointLibrary;