"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var genFileBuffer = require('@lacussoft/to-arraybuffer');

var requests = require('./facades/requests');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * file library through its REST API
 *
 * @constructor
 * @param {String} folderAddress Library title to connect to
 * @param {Axios} httpInstance Customized Axios instance to perform HTTP requests
 */


module.exports = function XomSharePointLibrary(folderAddress, httpInstance) {
  var _this = this;

  /**
   * Store the SharePoint folder relative URL
   *
   * @private
   * @var {String}
   */
  var _address = folderAddress;
  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */

  var _http = httpInstance;
  /**
   * Store files type
   *
   * @private
   * @final
   * @var {String}
   */

  var _filesType;
  /**
   * Define property to get 'relativeUrl' value
   *
   * @property {String} relativeUrl
   */


  Object.defineProperty(this, 'relativeUrl', {
    get: function get() {
      var baseUrl = new URL(_http.defaults.baseURL);
      return "".concat(baseUrl.pathname, "/").concat(_address);
    },
    set: function set(address) {
      _address = String(address);
    }
  });
  /**
   * Return a list of the folders within this folder
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */

  this.getSubfolders = function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return requests.getFoldersInFolder(_http, _this.relativeUrl, params);
  };
  /**
   * Create a folder within this folder
   *
   * @param {String} folderName
   * @return {Promise<Object>}
   */


  this.createFolder = function (folderName) {
    return requests.createFolder(_http, _this.relativeUrl, folderName);
  };
  /**
   * Return a list of the files within this folder
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */


  this.getFiles = function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return requests.getFilesInFolder(_http, _this.relativeUrl, params);
  };
  /**
   * Upload a file into the folder
   *
   * @param {String} fileName
   * @param {String|HTMLInputElement|FileList|File|Blob|ArrayBuffer} fileReference
   *          ArrayBuffer - raw data ready to be sent;
   *          Blob - if it is a file reference created on the fly;
   *          String - if it is a query selector;
   *          HTMLInputElement - if it is a direct reference to the HTML element of type "file";
   *          FileList - if it is a direct reference to the "files" attribute of the element;
   *          File - if it is a direct reference to the file
   * @return {Promise<Object>}
   */


  this.upload = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(fileName, fileReference) {
      var fileBuffer, result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return genFileBuffer(fileReference);

            case 2:
              fileBuffer = _context.sent;
              _context.next = 5;
              return requests.uploadFileToFolder(_http, _this.relativeUrl, fileName, fileBuffer);

            case 5:
              result = _context.sent;
              _filesType = _filesType || result.__metadata.type;
              return _context.abrupt("return", result);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};